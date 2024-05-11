import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CheckPoint } from '../entities/check-point.entity';

@Injectable()
export class CheckPointRepository extends Repository<CheckPoint> {
  constructor(private dataSource: DataSource) {
    super(CheckPoint, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<CheckPoint> {
    const checkPoint = await this.findOne({
      where: { id },
      relations: {
        route: true
      }
    });
    if (!checkPoint) {
      throw new NotFoundException();
    }
    return checkPoint;
  }
}
