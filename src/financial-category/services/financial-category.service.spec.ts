import { Test, TestingModule } from '@nestjs/testing';

import { FinancialCategoryService } from './financial-category.service';

describe('FinancialCategoryService', () => {
  let service: FinancialCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialCategoryService],
    }).compile();

    service = module.get<FinancialCategoryService>(FinancialCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
