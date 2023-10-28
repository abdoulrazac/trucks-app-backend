import { Test, TestingModule } from '@nestjs/testing';

import { InvoiceRepository } from './invoice.repository';

describe('InvoiceRepository', () => {
  let service: InvoiceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceRepository],
    }).compile();

    service = module.get<InvoiceRepository>(InvoiceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
