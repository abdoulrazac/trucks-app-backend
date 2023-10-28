import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import {Vehicle} from "../entities/vehicle.entity";

@Injectable()
export class VehicleRepository extends Repository<Vehicle>{

  constructor(private dataSource: DataSource) {
    super(Vehicle, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Vehicle> {
    const vehicle = await this.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException();
    }
    return vehicle;
  }
}
