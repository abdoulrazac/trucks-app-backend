import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';

@Injectable()
export class MailingService {
  constructor(
    private mailerService: MailerService,
    private readonly logger: AppLogger,
  ) {}

  async sendConfirmRegistration(
    ctx: RequestContext,
    fullname: string,
    emailAddress: string,
    url: string,
  ) {
    this.logger.log(
      ctx,
      `Sending confirm registration email to '${emailAddress}'`,
    );
    try {
      return this.mailerService.sendMail({
        to: emailAddress,
        subject: 'Registration',
        template: './registration',
        context: { name: fullname, url: url },
      });
    } catch {
      this.logger.error(
        ctx,
        `Failed to send confirmation email to '${emailAddress}'`,
      );
    }
  }

  async sendResetPassword(
    ctx: RequestContext,
    fullname: string,
    emailAddress: string,
    url: string,
  ) {
    this.logger.log(ctx, `Sending email to '${emailAddress}'`);
    try {
      return this.mailerService.sendMail({
        to: emailAddress,
        subject: 'Contact 3T-Business',
        template: './reset-password',
        context: { name: fullname, url: url },
      });
    } catch {
      this.logger.error(
        ctx,
        `Failed to send reset password email to '${emailAddress}'`,
      );
    }
  }
}
