import { Test, TestingModule } from '@nestjs/testing';

import { TravelCheckPointService } from './travel-check-point.service';

describe('TravelCheckPointService', () => {
  let service: TravelCheckPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelCheckPointService],
    }).compile();

    service = module.get<TravelCheckPointService>(TravelCheckPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
