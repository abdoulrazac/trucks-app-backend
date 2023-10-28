import { Test, TestingModule } from '@nestjs/testing';

import { ContractAclService } from './contract-acl.service';

describe('ContractAclService', () => {
  let service: ContractAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractAclService],
    }).compile();

    service = module.get<ContractAclService>(ContractAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
