import { Test, TestingModule } from '@nestjs/testing';

import { CheckPointAclService } from './check-point-acl.service';

describe('CheckPointAclService', () => {
  let service: CheckPointAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckPointAclService],
    }).compile();

    service = module.get<CheckPointAclService>(CheckPointAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
