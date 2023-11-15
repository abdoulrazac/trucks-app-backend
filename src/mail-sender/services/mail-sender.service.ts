import { Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import * as Mail from 'nodemailer/lib/mailer';

import {
  changeMail,
  changePasswordInfo,
  confirmMail,
  resetPassword,
} from '../templates';
import {AppLogger} from "../../shared/logger/logger.service";
import {RequestContext} from "../../shared/request-context/request-context.dto";

@Injectable()
export class MailSenderService {

  private socials: string;


  constructor(
    private configService: ConfigService,
    private mailerService: MailerService,
    private readonly logger: AppLogger
  ) {

    const socials = []
    socials.push(this.configService.get<string>('project.socialGithub'))
    socials.push(this.configService.get<string>('project.socialFacebook'))
    socials.push(this.configService.get<string>('project.socialTwitter'))

    this.socials = socials.join('') 
  }

  addProjectConfig(name : string, mail : string, buttonLink : string) {
    const html = mail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink)
      .replace(new RegExp('--ProjectName--', 'g'), this.configService.get<string>('project.name'))
      .replace(new RegExp('--ProjectAddress--', 'g'), this.configService.get<string>('project.address'))
      .replace(new RegExp('--ProjectLogo--', 'g'), this.configService.get<string>('project.logo'))
      .replace(new RegExp('--ProjectSlogan--', 'g'), this.configService.get<string>('project.slogan'))
      .replace(new RegExp('--ProjectColor--', 'g'), this.configService.get<string>('project.color'))
      .replace(new RegExp('--ProjectLink--', 'g'), this.configService.get<string>('project.url'))
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--TermsOfServiceLink--', 'g'), this.configService.get<string>('project.termsOfServiceUrl'));
    return html
  }

  async sendVerifyEmailMail(
    ctx : RequestContext,
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    this.logger.log(ctx, `${this.sendVerifyEmailMail.name} was called`);

    const buttonLink = `${this.configService.get<string>('mail.verificationUrl')}?token=${token}`;
    const mail = this.addProjectConfig(name, confirmMail, buttonLink)

    const mailOptions = {
      from: `"${this.configService.get<string>('mail.credentialName')}" <${this.configService.get<string>('mail.credentialEmail')}>`,
      to: 'a.razacsane@yahoo.com', //email, // list of receivers (separated by ,)
      subject: `Welcome to ${this.configService.get<string>('project.name')} ${name}! Confirm Your Email`,
      html: mail,
    };

    try {
      return this.mailerService.sendMail(mailOptions)
    } catch {
      this.logger.warn(
        ctx,
        'Mail sending failed, check your service credentials.',
      );
      return false
    }
  }

  async sendChangeEmailMail(
    ctx : RequestContext,
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    this.logger.log(ctx, `${this.sendChangeEmailMail.name} was called`);

    const buttonLink = `${this.configService.get<string>('mail.changeUrl')}?token=${token}`;
    const mail = this.addProjectConfig(name, changeMail, buttonLink)

    const mailOptions = {
      from: `"${this.configService.get<string>('mail.credentialName')}" <${this.configService.get<string>('mail.credentialEmail')}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Change Your ${this.configService.get<string>('project.name')} Account's Email`,
      html: mail,
    };

    try {
      return this.mailerService.sendMail(mailOptions)
    } catch {
      this.logger.warn(
        ctx,
        'Mail sending failed, check your service credentials.',
      );
      return false
    }
  }

  async sendResetPasswordMail(
    ctx : RequestContext,
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    this.logger.log(ctx, `${this.sendResetPasswordMail.name} was called`);

    const buttonLink = `${this.configService.get<string>('mail.resetPasswordUrl')}?token=${token}`;
    const mail = this.addProjectConfig(name, resetPassword, buttonLink)

    const mailOptions = {
      from: `"${this.configService.get<string>('mail.credentialName')}" <${this.configService.get<string>('mail.credentialEmail')}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Reset Your ${this.configService.get<string>('project.name')} Account's Password`,
      html: mail,
    };

    try {
      return this.mailerService.sendMail(mailOptions)
    } catch {
      this.logger.warn(
        ctx,
        'Mail sending failed, check your service credentials.',
      );
      return false
    }
  }

  async sendPasswordChangeInfoMail(
    ctx : RequestContext,
    name: string,
    email: string,
  ): Promise<boolean> {
    this.logger.log(ctx, `${this.sendPasswordChangeInfoMail.name} was called`);

    const buttonLink = this.configService.get<string>('project.url');
    const mail = this.addProjectConfig(name, changePasswordInfo, buttonLink)

    const mailOptions = {
      from: `"${this.configService.get<string>('mail.credentialName')}" <${this.configService.get<string>('mail.credentialEmail')}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Your ${this.configService.get<string>('project.name')} Account's Password is Changed`,
      html: mail,
    };

    try {
      return this.mailerService.sendMail(mailOptions)
    } catch {
      this.logger.warn(
        ctx,
        'Mail sending failed, check your service credentials.',
      );
      return false
    }
  }
}
