import { Test, TestingModule } from '@nestjs/testing';

import { CategoryAclService } from './category-acl.service';

describe('CategoryAclService', () => {
  let service: CategoryAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryAclService],
    }).compile();

    service = module.get<CategoryAclService>(CategoryAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
