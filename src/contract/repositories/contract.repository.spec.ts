import { Test, TestingModule } from '@nestjs/testing';

import { ContractRepository } from './contract.repository';

describe('ContractRepository', () => {
  let service: ContractRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractRepository],
    }).compile();

    service = module.get<ContractRepository>(ContractRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
