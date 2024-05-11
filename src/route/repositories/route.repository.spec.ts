import { Test, TestingModule } from '@nestjs/testing';

import { RouteRepository } from './route.repository';

describe('RouteRepository', () => {
  let service: RouteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RouteRepository],
    }).compile();

    service = module.get<RouteRepository>(RouteRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
