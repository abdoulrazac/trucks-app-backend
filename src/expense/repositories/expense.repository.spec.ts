import { Test, TestingModule } from '@nestjs/testing';

import { ExpenseRepository } from './expense.repository';

describe('ExpenseRepository', () => {
  let service: ExpenseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseRepository],
    }).compile();

    service = module.get<ExpenseRepository>(ExpenseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
