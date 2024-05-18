import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TravelCheckPoint } from '../entities/travel-check-point.entity';

@Injectable()
export class TravelCheckPointRepository extends Repository<TravelCheckPoint> {
  constructor(private dataSource: DataSource) {
    super(TravelCheckPoint, dataSource.createEntityManager());
  }
}
