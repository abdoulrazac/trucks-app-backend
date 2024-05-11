import { Test, TestingModule } from '@nestjs/testing';

import { RouteAclService } from './route-acl.service';

describe('RouteAclService', () => {
  let service: RouteAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RouteAclService],
    }).compile();

    service = module.get<RouteAclService>(RouteAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
