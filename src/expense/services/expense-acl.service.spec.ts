import { Test, TestingModule } from '@nestjs/testing';

import { ExpenseAclService } from './expense-acl.service';

describe('ExpenseAclService', () => {
  let service: ExpenseAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseAclService],
    }).compile();

    service = module.get<ExpenseAclService>(ExpenseAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
