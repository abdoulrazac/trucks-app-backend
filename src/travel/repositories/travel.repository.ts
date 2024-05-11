import { TravelCheckPoint } from "./../../check-point/entities/check-point.entity copy";

import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import {Travel} from "../entities/travel.entity";
import { CheckPoint } from "../../check-point/entities/check-point.entity";

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
        invoice : true,
        checkPoints : true,
      },
    });
    if (!travel) {
      throw new NotFoundException();
    }
    return travel;
  }
}
