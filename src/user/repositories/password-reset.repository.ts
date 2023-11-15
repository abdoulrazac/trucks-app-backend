import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PasswordReset } from '../entities/password-reset.entity';

@Injectable()
export class PasswordResetRepository extends Repository<PasswordReset> {
  constructor(private dataSource: DataSource) {
    super(PasswordReset, dataSource.createEntityManager());
  }

  async getByToken(token: string): Promise<PasswordReset> {
    const result = await this.findOne({ where: { token } });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
