import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { orderClean, whereClauseClean } from '../../shared/helpers';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { InvoiceCreateDto } from '../dtos/invoice-create.dto';
import { InvoiceOrderDto } from '../dtos/invoice-order.dto';
import { InvoiceOutputDto } from '../dtos/invoice-output.dto';
import { InvoiceParamDto } from '../dtos/invoice-param.dto';
import { InvoiceUpdateDto } from '../dtos/invoice-update.dto';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { InvoiceAclService } from './invoice-acl.service';
import { CompanyService } from '../../company/services/company.service';
import { Company } from '../../company/entities/company.entity';

@Injectable()
export class InvoiceService {
  constructor(
    private repository: InvoiceRepository,
    private aclService: InvoiceAclService,
    private companyService: CompanyService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(InvoiceService.name);
  }

  async getInvoices(
    ctx: RequestContext,
    filters: InvoiceParamDto,
    order: InvoiceOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ invoices: InvoiceOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getInvoices.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.findAndCount`);
    const [invoices, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      relations: {
        company: true,
      },
      take: limit,
      skip: offset,
    });

    const invoicesOutput = plainToInstance(InvoiceOutputDto, invoices, {
      excludeExtraneousValues: true,
    });

    return { invoices: invoicesOutput, count };
  }

  async createInvoice(
    ctx: RequestContext,
    input: InvoiceCreateDto,
  ): Promise<InvoiceOutputDto> {
    this.logger.log(ctx, `${this.createInvoice.name} was called`);

    const invoice = plainToInstance(Invoice, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, invoice);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    // Conductor controls
    try {
      const company = await this.companyService.getCompanyById(
        ctx,
        input.companyId,
      );
      invoice.company = plainToInstance(Company, company);
    } catch {
      throw new NotFoundException(
        `Conductor with ID '${input.companyId}'  Not Found`,
      );
    }

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.save`);
    const savedInvoice = await this.repository.save(invoice);

    return plainToInstance(InvoiceOutputDto, savedInvoice, {
      excludeExtraneousValues: true,
    });
  }

  async getInvoiceById(
    ctx: RequestContext,
    id: number,
  ): Promise<InvoiceOutputDto> {
    this.logger.log(ctx, `${this.getInvoiceById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.getById`);
    const invoice = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, invoice);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(InvoiceOutputDto, invoice, {
      excludeExtraneousValues: true,
    });
  }
  async updateInvoice(
    ctx: RequestContext,
    invoiceId: number,
    input: InvoiceUpdateDto,
  ): Promise<InvoiceOutputDto> {
    this.logger.log(ctx, `${this.updateInvoice.name} was called`);

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.getById`);
    const invoice = await this.repository.getById(invoiceId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, invoice);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    // Conductor controls
    if (input.companyId && input.companyId != invoice.company.id) {
      try {
        const company = await this.companyService.getCompanyById(
          ctx,
          input.companyId,
        );
        invoice.company = plainToInstance(Company, company);
      } catch {
        throw new NotFoundException(
          `Conductor with ID '${input.companyId}'  Not Found`,
        );
      }
    }

    const updatedInvoice: Invoice = {
      ...invoice,
      ...plainToInstance(Invoice, input),
    };

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.save`);
    const savedInvoice = await this.repository.save(updatedInvoice);

    return plainToInstance(InvoiceOutputDto, savedInvoice, {
      excludeExtraneousValues: true,
    });
  }

  async deleteInvoice(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteInvoice.name} was called`);

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.getById`);
    const invoice = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, invoice);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.remove`);
    try {
      await this.repository.remove(invoice);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
