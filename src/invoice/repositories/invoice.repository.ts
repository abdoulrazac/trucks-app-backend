import {Injectable, NotFoundException} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";

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
  }
}
