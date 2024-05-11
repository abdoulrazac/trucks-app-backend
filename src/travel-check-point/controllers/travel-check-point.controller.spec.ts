import { Test, TestingModule } from '@nestjs/testing';

import { TravelCheckPointController } from './travel-check-point.controller';

describe('TravelCheckPointController', () => {
  let controller: TravelCheckPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelCheckPointController],
    }).compile();

    controller = module.get<TravelCheckPointController>(TravelCheckPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
