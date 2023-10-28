import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import {Truck} from "../entities/truck.entity";

@Injectable()
export class TruckRepository extends Repository<Truck>{

  constructor(private dataSource: DataSource) {
    super(Truck, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Truck> {
    const truck = await this.findOne({
      where: { id },
      relations : {
        conductor : true,
        tractor : true,
        semiTrailer : true
      } });
    if (!truck) {
      throw new NotFoundException();
    }
    return truck;
  }
}
