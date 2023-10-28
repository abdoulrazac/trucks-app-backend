import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UserCreateDto } from '../dtos/user-create.dto';
import { UserOutputDto } from '../dtos/user-output.dto';
import { UserUpdateDto } from '../dtos/user-update-input.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import {
  creteUploadFile,
  orderClean,
  readUploadFile,
  whereClauseClean,
} from '../../shared/helpers';
import { UserParamDto } from '../dtos/user-param.dto';
import { UserOrderDto } from '../dtos/user-order.dto';
import { MailingService } from '../../mailing/services/mailing.service';
import { RegisterInput } from '../../auth/dtos/auth-register-input.dto';
import { Action } from '../../shared/acl/action.constant';
import { UserAclService } from './user-acl.service';
import { Actor } from '../../shared/acl/actor.constant';
import * as path from 'path';
import { join } from 'path';
import { DOCS_TYPES_AVATAR } from '../../shared/constants';
import { ConfigService } from '@nestjs/config';
import { BufferOutputDto } from '../../shared/dtos/buffer-output.dto';

@Injectable()
export class UserService {
  basePathAvatar: string;
  maxSize: number;
  bas;
  constructor(
    private configService: ConfigService,
    private repository: UserRepository,
    private mailingService: MailingService,
    private aclService: UserAclService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserService.name);
    this.basePathAvatar = this.configService.get<string>(
      'FILE_UPLOAD_DESTINATION_AVATAR',
    );
    this.maxSize = this.configService.get<number>('FILE_MAX_SIZE');
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
      fileName = `${user.id}-${new Date().getTime()}${fileExtension}`;

      if (Number(fileSize) > this.maxSize) {
        errorMessages.push(
          `File max size is ${this.maxSize.toString().slice(0, 1)}M`,
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
      this.logger.log(ctx, `calling ${creteUploadFile.name}.save`);
      user.avatar = await creteUploadFile(
        this.basePathAvatar,
        fileName,
        fileUploaded.buffer,
      );
    }

    this.logger.log(ctx, `calling ${UserRepository.name}.saveUser`);
    const savedUser = await this.repository.save(user);
    // const savedUser = await this.repository.save(user);
    // await this.mailingService.sendConfirmRegistration(ctx, savedUser.name, savedUser.email, 'test')
    // return plainToInstance(UserOutputDto, savedUser, {
    //   excludeExtraneousValues: true,
    // });
    // await this.mailingService.sendConfirmRegistration(
    //   ctx,
    //   'Abdoul Razac SANE',
    //   'a.razacsane@yahoo.com',
    //   'test',
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

    const match = await compare(pass, user.password);
    if (!match) throw new UnauthorizedException();

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

    const errorMessages: string[] = [];
    const canUpdateAll = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update);

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

      if (Number(fileSize) > this.maxSize) {
        errorMessages.push(
          `File max size is ${this.maxSize.toString().slice(0, 1)}M`,
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

    // merges the input (2nd line) to the found user (1st line)
    const updatedUser: User = {
      ...user,
      ...plainToInstance(User, input),
    };

    if (fileUploaded) {
      this.logger.log(ctx, `calling ${creteUploadFile.name}.save`);
      updatedUser.avatar = await creteUploadFile(
        this.basePathAvatar,
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
  ): Promise<BufferOutputDto> {
    this.logger.log(ctx, `${this.downloadAvatarByUserId.name} was called`);

    const user = await this.repository.getById(userId);

    const actor: Actor = ctx.user;
    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, user);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }
    const fileToStream = user.avatar
      ? await readUploadFile(join(process.cwd(), user.avatar))
      : false;
    if (!fileToStream) {
      throw new NotFoundException();
    }
    return { buffer: fileToStream, name: user.avatar };
  }
}
