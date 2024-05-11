import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import {MailSenderModule} from "../mail-sender/mail-sender.module";
import { SharedModule } from '../shared/shared.module';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { PasswordResetRepository } from './repositories/password-reset.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserAclService } from './services/user-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([User]),
    MailSenderModule
  ],
  providers: [UserService, JwtAuthStrategy, UserAclService, UserRepository, PasswordResetRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
