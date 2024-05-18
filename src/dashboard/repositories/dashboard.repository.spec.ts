import { Test, TestingModule } from '@nestjs/testing';

import { DashboardRepository } from './dashboard.repository';

describe('DashboardRepository', () => {
  let service: DashboardRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardRepository],
    }).compile();

    service = module.get<DashboardRepository>(DashboardRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
