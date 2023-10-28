import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import {Travel} from "../entities/travel.entity";

@Injectable()
export class TravelRepository extends Repository<Travel>{

  constructor(private dataSource: DataSource) {
    super(Travel, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Travel> {
    const travel = await this.findOne({
      where: { id },
      relations : {
        company : true,
        truck : true,
        invoice : true
      },
    });
    if (!travel) {
      throw new NotFoundException();
    }
    return travel;
  }
}
