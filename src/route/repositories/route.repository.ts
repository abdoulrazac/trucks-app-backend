import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Route } from '../entities/route.entity';

@Injectable()
export class RouteRepository extends Repository<Route> {
  constructor(private dataSource: DataSource) {
    super(Route, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Route> {
    const route = await this.findOne({
      where: { id },
    });
    if (!route) {
      throw new NotFoundException();
    }
    return route;
  }
}
