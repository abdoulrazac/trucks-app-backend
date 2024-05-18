import { Test, TestingModule } from '@nestjs/testing';

import { DashboardAclService } from './dashboard-acl.service';

describe('DashboardAclService', () => {
  let service: DashboardAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardAclService],
    }).compile();

    service = module.get<DashboardAclService>(DashboardAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
