import { Test, TestingModule } from '@nestjs/testing';

import { TruckRepository } from './truck.repository';

describe('TruckRepository', () => {
  let service: TruckRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckRepository],
    }).compile();

    service = module.get<TruckRepository>(TruckRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
