import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {EmailChange} from "../entities/email-change.entity";


@Injectable()
export class EmailChangeRepository extends Repository<EmailChange> {
  constructor(private dataSource: DataSource) {
    super(EmailChange, dataSource.createEntityManager());
  }

  async getByToken(token: string): Promise<EmailChange> {
    const result = await this.findOne({ where: { token } });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
