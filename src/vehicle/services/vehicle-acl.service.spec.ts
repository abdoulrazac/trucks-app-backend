import { Test, TestingModule } from '@nestjs/testing';

import { VehicleAclService } from './vehicle-acl.service';

describe('VehicleAclService', () => {
  let service: VehicleAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleAclService],
    }).compile();

    service = module.get<VehicleAclService>(VehicleAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
