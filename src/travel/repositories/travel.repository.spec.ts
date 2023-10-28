import { Test, TestingModule } from '@nestjs/testing';

import { TravelRepository } from './travel.repository';

describe('TravelRepository', () => {
  let service: TravelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelRepository],
    }).compile();

    service = module.get<TravelRepository>(TravelRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
