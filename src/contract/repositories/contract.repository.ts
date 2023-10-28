import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import {Contract} from "../entities/contract.entity";

@Injectable()
export class ContractRepository extends Repository<Contract>{

  constructor(private dataSource: DataSource) {
    super(Contract, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Contract> {
    const contract = await this.findOne({
      where: { id },
      relations : {
        author : true
      } });
    if (!contract) {
      throw new NotFoundException();
    }
    return contract;
  }
}
