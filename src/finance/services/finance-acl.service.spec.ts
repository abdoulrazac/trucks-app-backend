import { Test, TestingModule } from '@nestjs/testing';

import { FinanceAclService } from './finance-acl.service';

describe('FinanceAclService', () => {
  let service: FinanceAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinanceAclService],
    }).compile();

    service = module.get<FinanceAclService>(FinanceAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
