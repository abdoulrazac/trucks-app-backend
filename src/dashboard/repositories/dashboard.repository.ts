import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DashboardStatsOutputDto } from '../dtos/dashboard-stats-output.dto';

@Injectable()
export class DashboardRepository {
  constructor(private dataSource: DataSource) {}

  async getStatistics(): Promise<DashboardStatsOutputDto> {
    // count invoice by status
    const invoiceCountByStatus = await this.dataSource.query(`
      SELECT
          status,
          COUNT(*) AS count
      FROM
          invoices
      GROUP BY
          status;
    `);

    // sum transaction value by type
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

    // count travel by status
    const travelCountByStatus = await this.dataSource.query(`
      SELECT
          status,
          COUNT(*) AS count
      FROM
          travels
      GROUP BY
          status;
    `);

    // count user
    const userCount = await this.dataSource.query(`
      SELECT
          COUNT(*) AS count
      FROM
          users;
    `);

    // Breakdowns by status for current year
    const breakdownCountByStatus = await this.dataSource.query(`
        SELECT
            status,
            COUNT(*) AS count
        FROM
            breakdowns
        WHERE
            YEAR(occurredAt) = YEAR(CURDATE())
        GROUP BY
            status;
        `);

    // Transaction value by month and type for the last 12 months
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

    return {
      invoiceCountByStatus,
      transactionValueByType,
      travelCountByStatus,
      userCount : userCount[0].count,
      transactionValueByMonthType,
      breakdownCountByStatus,
    };
  }
}
