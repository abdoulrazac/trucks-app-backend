import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {EmailVerification} from "../entities/email-verification.entity";


@Injectable()
export class EmailVerificationRepository extends Repository<EmailVerification> {
  constructor(private dataSource: DataSource) {
    super(EmailVerification, dataSource.createEntityManager());
  }

  async getByToken(token: string): Promise<EmailVerification> {
    const result = await this.findOne({ where: { token } });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
