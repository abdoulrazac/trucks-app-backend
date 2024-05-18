import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

import { InvoiceStatsOutputDto } from '../dtos/invoice-stats-output.dto';
import {Invoice} from "../entities/invoice.entity";

@Injectable()
export class InvoiceRepository extends Repository<Invoice>{

  constructor(private dataSource: DataSource) {
    super(Invoice, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<Invoice> {
    const invoice = await this.findOne({
      where: { id },
      relations : {
        company : true,
        travels : true,
      } });
    if (!invoice) {
      throw new NotFoundException();
    }
    return invoice;
  };

  async getStatistics(): Promise<InvoiceStatsOutputDto> {
    // Invoice count by status
    const invoiceCountByStatus = await this.dataSource.query(`
      SELECT
          status,
          COUNT(*) AS count
      FROM
          invoices
      GROUP BY
          status;
    `);

    // Get 5 last invoices
    const lastInvoices = await this.dataSource.query(`
      SELECT
          *
      FROM
          invoices
      ORDER BY
          createdAt DESC
      LIMIT 5;
    `);

    //invoiceCountByCompany with status created
    const invoiceCountByCompany = await this.dataSource.query(`
      SELECT
          shortname,
          COUNT(*) AS count
      FROM invoices 
        LEFT JOIN companies 
        ON invoices.companyId = companies.id
      WHERE LOWER(status) = 'created'
      GROUP BY
        shortname;
    `);

    return {
      invoiceCountByStatus,
      lastInvoices,
      invoiceCountByCompany,
    };
  }
}
