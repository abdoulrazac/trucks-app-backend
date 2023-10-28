import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import {Expense} from "../entities/expense.entity";

@Injectable()
export class ExpenseRepository extends Repository<Expense>{

  constructor(private dataSource: DataSource) {
    super(Expense, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Expense> {
    const expense = await this.findOne({
      where: { id },
      relations : {
        vehicle : true,
        category : true
      } });
    if (!expense) {
      throw new NotFoundException();
    }
    return expense;
  }
}
