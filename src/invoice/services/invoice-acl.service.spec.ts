import { Test, TestingModule } from '@nestjs/testing';

import { InvoiceAclService } from './invoice-acl.service';

describe('InvoiceAclService', () => {
  let service: InvoiceAclService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceAclService],
    }).compile();

    service = module.get<InvoiceAclService>(InvoiceAclService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
