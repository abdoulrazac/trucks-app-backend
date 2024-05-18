import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import {Company} from "../entities/company.entity";

@Injectable()
export class CompanyRepository extends Repository<Company>{

  constructor(private dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Company> {
    const company = await this.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException();
    }
    return company;
  }

  
  async getStatisticsById(id: number): Promise<any> {
    // Breakdowns by month and type for the last 12 months
    const travelCountByMonth = await this.dataSource.query(`
      SELECT
          DATE_FORMAT(createdAt, '%Y-%m') AS month,
          COUNT(*) AS count
      FROM
          travels
      WHERE
          companyId = ${id}
      GROUP BY
          month
      ORDER BY
          month ASC;
    `);
    
    // Count of travels
    const travelCount = await this.dataSource.query(`
      SELECT
          COUNT(*) AS count
      FROM
          travels
      WHERE
          companyId = ${id};
    `);

    // Count invoices created
    const invoiceCountByStatus = await this.dataSource.query(`
      SELECT
          status,
          COUNT(*) AS count
      FROM
          invoices
      WHERE
          companyId = ${id}
      GROUP BY
          status;
    `);

    return {
      travelCountByMonth,
      travelCount : travelCount[0].count,
      invoiceCountByStatus
    };
  }
}
