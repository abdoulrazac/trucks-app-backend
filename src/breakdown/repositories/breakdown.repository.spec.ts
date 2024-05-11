import { Test, TestingModule } from '@nestjs/testing';

import { BreakdownRepository } from './breakdown.repository';

describe('BreakdownRepository', () => {
  let service: BreakdownRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreakdownRepository],
    }).compile();

    service = module.get<BreakdownRepository>(BreakdownRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
