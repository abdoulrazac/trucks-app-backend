import { Test, TestingModule } from '@nestjs/testing';

import { TravelAclService } from './travel-acl.service';

describe('TravelAclService', () => {
  let service: TravelAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelAclService],
    }).compile();

    service = module.get<TravelAclService>(TravelAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
