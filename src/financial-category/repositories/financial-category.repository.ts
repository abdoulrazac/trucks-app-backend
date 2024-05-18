import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FinancialCategory } from '../entities/financial-category.entity';


@Injectable()
export class FinancialCategoryRepository extends Repository<FinancialCategory> {
  constructor(private dataSource: DataSource) {
    super(FinancialCategory, dataSource.createEntityManager());
  }
}
