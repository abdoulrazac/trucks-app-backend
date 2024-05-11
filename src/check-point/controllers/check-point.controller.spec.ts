import { Test, TestingModule } from '@nestjs/testing';

import { CheckPointController } from './check-point.controller';

describe('CheckPointController', () => {
  let controller: CheckPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckPointController],
    }).compile();

    controller = module.get<CheckPointController>(CheckPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
