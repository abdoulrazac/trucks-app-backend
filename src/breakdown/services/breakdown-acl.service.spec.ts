import { Test, TestingModule } from '@nestjs/testing';

import { BreakdownAclService } from './breakdown-acl.service';

describe('BreakdownAclService', () => {
  let service: BreakdownAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreakdownAclService],
    }).compile();

    service = module.get<BreakdownAclService>(BreakdownAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
