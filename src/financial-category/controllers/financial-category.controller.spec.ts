import { Test, TestingModule } from '@nestjs/testing';

import { FinancialCategoryController } from './financial-category.controller';

describe('FinancialCategoryController', () => {
  let controller: FinancialCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialCategoryController],
    }).compile();

    controller = module.get<FinancialCategoryController>(FinancialCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
