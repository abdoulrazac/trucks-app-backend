import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UserOutputDto } from '../../user/dtos/user-output.dto';
import { UserService } from '../../user/services/user.service';
import { ROLE } from '../constants/role.constant';
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
import { CONFIRM_REGISTRATION, RESET_PASSWORD } from '../../shared/constants';
import { MailingService } from '../../mailing/services/mailing.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailingService: MailingService,
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
    const authToken = this.getAuthToken(ctx, user, true);
    const link = this.generateLink(authToken.accessToken, RESET_PASSWORD);

    // await this.mailingService.sendResetPassword(ctx, user.name, user.email, link)
    await this.mailingService.sendResetPassword(
      ctx,
      user.name,
      'a.razacsane@yahoo.com',
      link,
    );
    return plainToInstance(ResetPasswordOutputDto, {
      username: user.username,
      message: 'Reset password mail is send to username email',
    });
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
    isResetPassword = false,
  ): AuthTokenOutput {
    this.logger.log(ctx, `${this.getAuthToken.name} was called`);

    const subject = { sub: user.id };
    const payload = {
      username: user.username,
      sub: user.id,
      roles: isResetPassword ? [] : user.roles,
    };

    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: this.configService.get('jwt.refreshTokenExpiresInSec'),
      }),
      accessToken: this.jwtService.sign(
        { ...payload, ...subject },
        { expiresIn: this.configService.get('jwt.accessTokenExpiresInSec') },
      ),
    };
    return plainToInstance(AuthTokenOutput, authToken, {
      excludeExtraneousValues: true,
    });
  }

  generateLink(token: string, type: string) {
    let link = ''; //this.configService.get<string>('APP_AUTH_HOST');
    if (type == CONFIRM_REGISTRATION) {
      link = link + '/confirm-registration';
    }
    if (type == RESET_PASSWORD) {
      link = link + '/reset-password';
    }
    return link;
  }
}
