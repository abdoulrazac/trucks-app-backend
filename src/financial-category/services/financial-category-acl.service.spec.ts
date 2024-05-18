import { Test, TestingModule } from '@nestjs/testing';

import { FinancialCategoryAclService } from './financial-category-acl.service';

describe('FinancialCategoryAclService', () => {
  let service: FinancialCategoryAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialCategoryAclService],
    }).compile();

    service = module.get<FinancialCategoryAclService>(FinancialCategoryAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
