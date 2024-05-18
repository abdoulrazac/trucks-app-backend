import { Test, TestingModule } from '@nestjs/testing';

import { FinanceRepository } from './finance.repository';

describe('FinanceRepository', () => {
  let service: FinanceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinanceRepository],
    }).compile();

    service = module.get<FinanceRepository>(FinanceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
