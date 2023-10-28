import { Test, TestingModule } from '@nestjs/testing';

import { TruckAclService } from './truck-acl.service';

describe('TruckAclService', () => {
  let service: TruckAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckAclService],
    }).compile();

    service = module.get<TruckAclService>(TruckAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
