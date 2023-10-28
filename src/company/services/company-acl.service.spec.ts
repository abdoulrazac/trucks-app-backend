import { Test, TestingModule } from '@nestjs/testing';

import { CompanyAclService } from './company-acl.service';

describe('CompanyAclService', () => {
  let service: CompanyAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyAclService],
    }).compile();

    service = module.get<CompanyAclService>(CompanyAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
