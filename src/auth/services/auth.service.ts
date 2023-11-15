import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UserOutputDto } from '../../user/dtos/user-output.dto';
import { UserService } from '../../user/services/user.service';
import { ROLE } from '../../shared/constants';
import { RegisterInput } from '../dtos/auth-register-input.dto';
import { RegisterOutput } from '../dtos/auth-register-output.dto';
import {
  AuthTokenOutput,
  UserAccessTokenClaims,
} from '../dtos/auth-token-output.dto';
import {
  ResetPasswordOutputDto,
  ResetPasswordRequestDto,
} from '../dtos/auth-reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async validateUser(
    ctx: RequestContext,
    username: string,
    pass: string,
  ): Promise<UserAccessTokenClaims> {
    this.logger.log(ctx, `${this.validateUser.name} was called`);

    // The userService will throw Unauthorized in case of invalid username/password.
    const user = await this.userService.validateUsernamePassword(
      ctx,
      username,
      pass,
    );

    // Prevent disabled users from logging in.
    if (user.isAccountDisabled) {
      throw new UnauthorizedException('This user account has been disabled');
    }

    return user;
  }

  login(ctx: RequestContext): AuthTokenOutput {
    this.logger.log(ctx, `${this.login.name} was called`);

    return this.getAuthToken(ctx, ctx.user);
  }

  

  async register(
    ctx: RequestContext,
    input: RegisterInput,
  ): Promise<RegisterOutput> {
    this.logger.log(ctx, `${this.register.name} was called`);

    // TODO : Setting default role as USER here. Will add option to change this later via ADMIN users.
    input.roles = [ROLE.CONDUCTOR];
    input.isAccountDisabled = false;

    const registeredUser = await this.userService.createUser(ctx, input);
    return plainToInstance(RegisterOutput, registeredUser, {
      excludeExtraneousValues: true,
    });
  }

  async resetPasswordRequest(
    ctx: RequestContext,
    input: ResetPasswordRequestDto,
  ): Promise<ResetPasswordOutputDto> {
    this.logger.log(ctx, `${this.resetPasswordRequest.name} was called`);

    const user = await this.userService.findByUsername(ctx, input.username);

    return plainToInstance(ResetPasswordOutputDto, {
      username: user.username,
      message: 'Reset password mail is send to username email',
    });
  }

  async sendResetPasswordMail(email: string): Promise<void> {
    // const user = await this.prisma.user.findUnique({
    //   where: { email: email.toLowerCase() },
    //   select: {
    //     id: true,
    //     firstName: true,
    //     email: true,
    //   },
    // });

    // if (user === null) {
    //   throw new NotFoundException();
    // }

    // const deletePrevPasswordResetIfExist = this.prisma.passwordReset.deleteMany(
    //   {
    //     where: { userId: user.id },
    //   },
    // );

    // const token = nanoid();

    // const createPasswordReset = this.prisma.passwordReset.create({
    //   data: {
    //     userId: user.id,
    //     token,
    //   },
    //   select: null,
    // });

    // await this.prisma.$transaction([
    //   deletePrevPasswordResetIfExist,
    //   createPasswordReset,
    // ]);

    // await this.mailSenderService.sendResetPasswordMail(
    //   user.firstName,
    //   user.email,
    //   token,
    // );
  }



  async refreshToken(ctx: RequestContext): Promise<AuthTokenOutput> {
    this.logger.log(ctx, `${this.refreshToken.name} was called`);

    const user = await this.userService.findById(ctx, ctx.user.id);
    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    }

    return this.getAuthToken(ctx, user);
  }

  getAuthToken(
    ctx: RequestContext,
    user: UserAccessTokenClaims | UserOutputDto,
  ): AuthTokenOutput {
    this.logger.log(ctx, `${this.getAuthToken.name} was called`);

    const subject = { sub: user.id };
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };

    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: this.configService.get<number>('jwt.refreshTokenExpiresInSec'),
      }),
      accessToken: this.jwtService.sign(
        { ...payload, ...subject },
        { expiresIn: this.configService.get<number>('jwt.accessTokenExpiresInSec') },
      ),
    };
    return plainToInstance(AuthTokenOutput, authToken, {
      excludeExtraneousValues: true,
    });
  }
}
