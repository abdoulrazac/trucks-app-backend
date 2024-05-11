import { Test, TestingModule } from '@nestjs/testing';

import { TravelCheckPointAclService } from './travel-check-point-acl.service';

describe('TravelCheckPointAclService', () => {
  let service: TravelCheckPointAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelCheckPointAclService],
    }).compile();

    service = module.get<TravelCheckPointAclService>(TravelCheckPointAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
