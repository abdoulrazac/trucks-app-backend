import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import {Breakdown} from "../entities/breakdown.entity";

@Injectable()
export class BreakdownRepository extends Repository<Breakdown>{

  constructor(private dataSource: DataSource) {
    super(Breakdown, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Breakdown> {
    const breakdown= await this.findOne({
      where: { id },
      relations : {
        vehicle : true
      } });
    if (!breakdown) {
      throw new NotFoundException();
    }
    return breakdown;
  }

  getCountLast12MonthsBreakdowns(vehicleId: number): Promise<{month : string, count : number}[]> {
    return this.dataSource.query(`
      SELECT
        to_char(date_trunc('month', occurredAt), 'YYYY-MM') as month,
        count(*) as count
      FROM breakdowns
      WHERE vehicleId = $1
      AND occurredAt > now() - interval '12 months'
      GROUP BY month
      ORDER BY month
    `, [vehicleId]);
  }
}
