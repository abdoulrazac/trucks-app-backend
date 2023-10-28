import { Test, TestingModule } from '@nestjs/testing';

import { FileAclService } from './file-acl.service';

describe('FileAclService', () => {
  let service: FileAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileAclService],
    }).compile();

    service = module.get<FileAclService>(FileAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
