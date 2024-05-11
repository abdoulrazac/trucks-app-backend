import { Test, TestingModule } from '@nestjs/testing';

import { TravelCheckPointRepository } from './travel-check-point.repository';

describe('TravelCheckPointRepository', () => {
  let service: TravelCheckPointRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelCheckPointRepository],
    }).compile();

    service = module.get<TravelCheckPointRepository>(TravelCheckPointRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
