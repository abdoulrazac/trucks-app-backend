import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailSenderService } from './services/mail-sender.service';
import { SharedModule } from 'src/shared/shared.module';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    SharedModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.host'),
          secure: configService.get<string>('mail.secure'),
          auth: {
            user: configService.get<string>('mail.user'),
            pass: configService.get<string>('mail.password'),
          },
        },
        defaults: {
          from: `"No reply" <${configService.get<string>('mail.credentialEmail')}>`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailSenderService],
  exports: [MailSenderService],
})
export class MailSenderModule {}
