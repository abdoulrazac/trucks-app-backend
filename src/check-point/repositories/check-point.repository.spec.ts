import { Test, TestingModule } from '@nestjs/testing';

import { CheckPointRepository } from './check-point.repository';

describe('CheckPointRepository', () => {
  let service: CheckPointRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckPointRepository],
    }).compile();

    service = module.get<CheckPointRepository>(CheckPointRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
