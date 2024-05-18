import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Finance } from '../entities/finance.entity';

@Injectable()
export class FinanceRepository extends Repository<Finance> {
  constructor(private dataSource: DataSource) {
    super(Finance, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Finance> {
    const finance = await this.findOne({
      where: { id },
      relations: {
        vehicle: true,
        breakdown: true,
        user: true,
        invoice: true,
      },
    });
    if (!finance) {
      throw new NotFoundException();
    }
    return finance;
  }

  async getStatistics(): Promise<any> {
    // Invoice count by status
    const transactionCountByMonthType = await this.dataSource.query(`
      SELECT
          DATE_FORMAT(transactionDate, '%Y-%m') AS month,
          type,
          COUNT(*) AS count
      FROM
          finances
      WHERE
      transactionDate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      GROUP BY
          month,
          type
      ORDER BY
          month DESC,
          type;
    `);

    const transactionValueByMonthType = await this.dataSource.query(`
      SELECT
          DATE_FORMAT(transactionDate, '%Y-%m') AS month,
          type,
          SUM(unitNumber*unitPrice) AS total
      FROM
          finances
      WHERE
      transactionDate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      GROUP BY
          month,
          type
      ORDER BY
          month DESC,
          type;
    `);

    // Sum of all transactions by type for current year
    const transactionValueByType = await this.dataSource.query(`
        SELECT
            type,
            SUM(unitNumber*unitPrice) AS total
        FROM
            finances
        WHERE
            YEAR(transactionDate) = YEAR(CURDATE())
        GROUP BY
            type;
    `);

    return {
      transactionCountByMonthType,
      transactionValueByMonthType,
      transactionValueByType,
    };
  }
}
