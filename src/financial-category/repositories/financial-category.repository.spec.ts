import { Test, TestingModule } from '@nestjs/testing';

import { FinancialCategoryRepository } from './financial-category.repository';

describe('FinancialCategoryRepository', () => {
  let service: FinancialCategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialCategoryRepository],
    }).compile();

    service = module.get<FinancialCategoryRepository>(FinancialCategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
