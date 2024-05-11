import {Injectable, NotAcceptableException, NotFoundException, UnauthorizedException,} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {compare, hash} from 'bcrypt';
import {plainToInstance} from 'class-transformer';
import {nanoid} from 'nanoid';
import * as path from 'path';

import {RegisterInput} from '../../auth/dtos/auth-register-input.dto';
import {MailSenderService} from "../../mail-sender/services/mail-sender.service";
import {Action} from '../../shared/acl/action.constant';
import {Actor} from '../../shared/acl/actor.constant';
import {DOCS_TYPES_AVATAR} from '../../shared/constants';
import {createUploadFile, getFilePath, orderClean, whereClauseClean,} from '../../shared/helpers';
import {AppLogger} from '../../shared/logger/logger.service';
import {RequestContext} from '../../shared/request-context/request-context.dto';
import {UserCreateDto} from '../dtos/user-create.dto';
import {UserOrderDto} from '../dtos/user-order.dto';
import {UserOutputDto} from '../dtos/user-output.dto';
import {UserParamDto} from '../dtos/user-param.dto';
import {UserUpdateDto} from '../dtos/user-update-input.dto';
import {EmailVerification} from "../entities/email-verification.entity";
import { PasswordReset } from '../entities/password-reset.entity';
import {User} from '../entities/user.entity';
import {UserRepository} from '../repositories/user.repository';
import { PasswordResetRepository } from './../repositories/password-reset.repository';
import {UserAclService} from './user-acl.service';

@Injectable()
export class UserService {
  BASE_PATH_AVATAR: string;
  MAX_SIZE: number; 
  RESET_PASSWORD_DURATION: number;

  constructor(
    private configService: ConfigService,
    private repository: UserRepository, 
    private passwordResetRepository: PasswordResetRepository,
    private aclService: UserAclService,
    private readonly logger: AppLogger,
    private mailSenderService: MailSenderService
  ) {
    this.logger.setContext(UserService.name);
    this.BASE_PATH_AVATAR = this.configService.get<string>('file.uploadDestinationAvatar');
    this.MAX_SIZE = this.configService.get<number>('file.maxSize');
    this.RESET_PASSWORD_DURATION = this.configService.get<number>('setting.passwordResetDuration');    
  }

  async createUser(
    ctx: RequestContext,
    input: UserCreateDto | RegisterInput,
    fileUploaded: Express.Multer.File = null,
  ): Promise<UserOutputDto> {
    this.logger.log(ctx, `${this.createUser.name} was called`);

    const actor: Actor = ctx.user;
    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }
    const user = plainToInstance(User, input);
    const emailVerification = plainToInstance(EmailVerification, {
      token: nanoid(32),
      newEmail: input.email,
    })
    user.emailVerifications = [emailVerification];

    user.password = await hash(input.password, 10);

    const errorMessages: string[] = [];

    // Check username
    try {
      const user = await this.repository.findOne({
        where: { email: input.email },
      });
      if (user) {
        errorMessages.push(`Is already user with email '${input.email}' !`);
      }
    } catch {
      errorMessages.push(`Cannot check email '${input.email}' !`);
    }

    // Check username
    try {
      const user = await this.repository.findOne({
        where: { username: input.username },
      });
      if (user) {
        errorMessages.push(
          `Is already user with username '${input.username}' !`,
        );
      }
    } catch {
      errorMessages.push(`Cannot check username '${input.username}' !`);
    }

    // Check numTel
    try {
      const user = await this.repository.findOne({
        where: { numTel: input.numTel },
      });
      if (user) {
        errorMessages.push(`Is already user with phone '${input.numTel}' !`);
      }
    } catch {
      errorMessages.push(`Cannot check phone number '${input.numTel}' !`);
    }

    // File upload logic
    let fileName: string | null = null;
    if (fileUploaded) {
      const fileSize = fileUploaded.size;
      const fileExtension = path.extname(fileUploaded.originalname);
      fileName = `${user.id?user.id:0}-${new Date().getTime()}${fileExtension}`;

      if (Number(fileSize) > this.MAX_SIZE) {
        errorMessages.push(
          `File max size is ${this.MAX_SIZE.toString().slice(0, 1)}M`,
        );
      }

      if (!DOCS_TYPES_AVATAR.includes(fileExtension)) {
        errorMessages.push(`Only [${DOCS_TYPES_AVATAR}] are allowed !`);
      }
    }

    // Check if there is an error
    if (errorMessages.length != 0) {
      throw new NotAcceptableException(errorMessages);
    }

    if (fileUploaded) {
      this.logger.log(ctx, `calling ${createUploadFile.name}.save`);
      user.avatar = await createUploadFile(
        this.BASE_PATH_AVATAR,
        fileName,
        fileUploaded.buffer,
      );
    }

    this.logger.log(ctx, `calling ${UserRepository.name}.saveUser`);
    const savedUser = await this.repository.save(user);
    
    // ============= Send email verification mail =============
    // await this.mailSenderService.sendVerifyEmailMail(
    //   ctx,
    //   savedUser.name,
    //   savedUser.email,
    //   savedUser.emailVerifications[0].token
    // );

    return plainToInstance(UserOutputDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async validateUsernamePassword(
    ctx: RequestContext,
    username: string,
    pass: string,
  ): Promise<UserOutputDto> {
    this.logger.log(ctx, `${this.validateUsernamePassword.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`);
    const user = await this.repository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException();
    if (user && user.attempts >= 5) throw new UnauthorizedException("Too many attempts, please contact administrator");

    const match = await compare(pass, user.password);
    if (!match){
      user.attempts += 1;
      if (user.attempts >= 5) user.isAccountDisabled = true;
      this.logger.log(ctx, `calling ${UserRepository.name}.save`);
      await this.repository.save(user);
      throw new UnauthorizedException('Invalid username or password. It remains ' + (5 - user.attempts) + ' attempts');
    } else {
      user.attempts = 0;
      this.logger.log(ctx, `calling ${UserRepository.name}.save`);
      await this.repository.save(user);
    }

    return plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUsers(
    ctx: RequestContext,
    filters: UserParamDto,
    order: UserOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ users: UserOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getUsers.name} was called`);

    const actor: Actor = ctx.user;
    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${UserRepository.name}.findAndCount`);
    const [users, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      take: limit,
      skip: offset,
    });

    const usersOutput = plainToInstance(UserOutputDto, users, {
      excludeExtraneousValues: true,
    });

    return { users: usersOutput, count };
  }

  async findById(ctx: RequestContext, id: number): Promise<UserOutputDto> {
    this.logger.log(ctx, `${this.findById.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`);
    const user = await this.repository.findOne({ where: { id } });

    return plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async getUserById(ctx: RequestContext, id: number): Promise<UserOutputDto> {
    this.logger.log(ctx, `${this.getUserById.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.getById`);
    const user = await this.repository.getById(id);

    const actor: Actor = ctx.user;
    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, user);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }
    return plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findByUsername(
    ctx: RequestContext,
    username: string,
  ): Promise<UserOutputDto> {
    this.logger.log(ctx, `${this.findByUsername.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.findOne`);
    const user = await this.repository.findOne({ where: { username } });

    return plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(
    ctx: RequestContext,
    userId: number,
    input: UserUpdateDto,
    fileUploaded: Express.Multer.File = null,
  ): Promise<UserOutputDto> {
    this.logger.log(ctx, `${this.updateUser.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.getById`);
    const user = await this.repository.getById(userId);

    const actor: Actor = ctx.user;
    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, user);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }
    console.log(actor);

    const errorMessages: string[] = [];
    const canUpdateAll = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, user);

    // Check allowed fields
    if (!canUpdateAll) {
      if (input.name) {
        errorMessages.push(`You don't allow to update name !`);
      }
      if (input.roles) {
        errorMessages.push(`You don't allow to update roles !`);
      }
      if (input.username) {
        errorMessages.push(`You don't allow to update username !`);
      }
      if (input.status) {
        errorMessages.push(`You don't allow to update status !`);
      }
      if (input.isAccountDisabled) {
        errorMessages.push(
          `You don't allow to update state isAccountDisabled !`,
        );
      }
    }
    // Check username
    if (input.email && input.email != user.email) {
      try {
        const user = await this.repository.findOne({
          where: { email: input.email },
        });
        if (user) {
          errorMessages.push(`Is already user with email '${input.email}' !`);
        }
      } catch {
        errorMessages.push(`Cannot check email '${input.email}' !`);
      }
    }

    // Check username
    if (input.username && input.username != user.username) {
      try {
        const user = await this.repository.findOne({
          where: { username: input.username },
        });
        if (user) {
          errorMessages.push(
            `Is already user with username '${input.username}' !`,
          );
        }
      } catch {
        errorMessages.push(`Cannot check username '${input.username}' !`);
      }
    }

    // Check numTel
    if (input.numTel && input.numTel != user.numTel) {
      try {
        const user = await this.repository.findOne({
          where: { numTel: input.numTel },
        });
        if (user) {
          errorMessages.push(`Is already user with phone '${input.numTel}' !`);
        }
      } catch {
        errorMessages.push(`Cannot check phone number '${input.numTel}' !`);
      }
    }

    // Hash the password if it exists in the input payload.
    if (input.password) {
      input.password = await hash(input.password, 10);
    } 

    // File upload logic
    let fileName: string | null = null;
    if (fileUploaded) {
      const fileSize = fileUploaded.size;
      const fileExtension = path.extname(fileUploaded.originalname);
      fileName = `${user.id}-${new Date().getTime()}${fileExtension}`;

      if (Number(fileSize) > this.MAX_SIZE) {
        errorMessages.push(
          `File max size is ${this.MAX_SIZE.toString().slice(0, 1)}M`,
        );
      }

      if (!DOCS_TYPES_AVATAR.includes(fileExtension.toLowerCase())) {
        errorMessages.push(`Only [${DOCS_TYPES_AVATAR}] are allowed !`);
      }
    }

    // Check if there is an error
    if (errorMessages.length != 0) {
      throw new NotAcceptableException(errorMessages);
    }

    // Update user  attempts
    if(input.isAccountDisabled){
      user.attempts = 0;
    }
    // merges the input (2nd line) to the found user (1st line)
    const updatedUser: User = {
      ...user,
      ...plainToInstance(User, input),
    };

    if (fileUploaded) {
      this.logger.log(ctx, `calling ${createUploadFile.name}.save`);
      updatedUser.avatar = await createUploadFile(
        this.BASE_PATH_AVATAR,
        fileName,
        fileUploaded.buffer,
      );
    }

    this.logger.log(ctx, `calling ${UserRepository.name}.save`);
    await this.repository.save(updatedUser);

    return plainToInstance(UserOutputDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async downloadAvatarByUserId(
    ctx: RequestContext,
    userId: number,
  ): Promise<string> {
    this.logger.log(ctx, `${this.downloadAvatarByUserId.name} was called`);

    const user = await this.repository.getById(userId);

    const actor: Actor = ctx.user;
    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, user);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const filePath =  await getFilePath(user.avatar)
    if (!user.avatar || !filePath ){
      throw new NotFoundException('Avatar Not Found');
    }
    return filePath
  }

  //Add reset password item to user
  async resetPasswordRequest(ctx: RequestContext, user: UserOutputDto): Promise<PasswordReset> {
    this.logger.log(ctx, `${this.resetPasswordRequest.name} was called`);

    const passwordReset = plainToInstance(PasswordReset, {
      token: nanoid(64), 
      validUntil: new Date(Date.now() + this.RESET_PASSWORD_DURATION),
      user: user,
    });

    this.logger.log(ctx, `calling ${PasswordResetRepository.name}.save`);

    const tokens = await this.passwordResetRepository.find({ where: { user : {id : user.id} }});
    await this.passwordResetRepository.remove(tokens);

    const token = await this.passwordResetRepository.save(passwordReset);

    return token;
  }

  //Reset password
  async resetPassword(ctx: RequestContext, username: string, token: string, password: string): Promise<UserOutputDto> {
    this.logger.log(ctx, `${this.resetPassword.name} was called`);

    this.logger.log(ctx, `calling ${PasswordResetRepository.name}.getByToken`)
    const tokenRow = await this.passwordResetRepository.findOne({ where: { token: token }, relations: ['user']});

    // Check if token is valid and not expired and belongs to the user
    if (!tokenRow || tokenRow.user.username !== username) {
      throw new UnauthorizedException('Invalid token');
    }
    
    if (((+tokenRow.createdAt.getTime()) + (+this.RESET_PASSWORD_DURATION))  < +(new Date()).getTime()) {
      throw new UnauthorizedException('Token expired');
    }

    // Reset password
    const user= await this.repository.findOne({ where: { username: username }});
    user.password = await hash(password, 10);

    this.logger.log(ctx, `calling ${UserRepository.name}.save`);
    await this.repository.save(user);

    // Remove token
    this.logger.log(ctx, `calling ${PasswordResetRepository.name}.remove`);
    await this.passwordResetRepository.remove(tokenRow);

    return plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }
} 
