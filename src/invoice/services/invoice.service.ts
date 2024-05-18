import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { nextReference } from 'src/shared/helpers/reference-generator';

import { Company } from '../../company/entities/company.entity';
import { CompanyService } from '../../company/services/company.service';
import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { INVOICE_STATUS } from '../../shared/constants';
import { orderClean, whereClauseClean } from '../../shared/helpers';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { InvoiceCreateDto } from '../dtos/invoice-create.dto';
import { InvoiceOrderDto } from '../dtos/invoice-order.dto';
import { InvoiceOutputDto } from '../dtos/invoice-output.dto';
import { InvoiceParamDto } from '../dtos/invoice-param.dto';
import { InvoiceStatsOutputDto } from '../dtos/invoice-stats-output.dto';
import { InvoiceUpdateDto } from '../dtos/invoice-update.dto';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { REFERENCE_TYPE } from './../../shared/constants/common';
import { InvoiceAclService } from './invoice-acl.service';

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
      relations: ["company"],
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

    const errorMessages = [];

    // Conductor controls
    if (input.companyId) {
      try {
        const company = await this.companyService.getCompanyById(
          ctx,
          input.companyId,
        );
        invoice.company = plainToInstance(Company, company);
      } catch {
        errorMessages.push(`Conductor with ID '${input.companyId}'  Not Found`);
      }
    }

    if (errorMessages.length > 0) {
      throw new BadRequestException(errorMessages);
    }

    // Get last invoice number
    const lastInvoice = await this.repository.find({
      order: { id: 'DESC' },
      take: 1,
    });

    // Generate new invoice number
    invoice.numInvoice = nextReference(
      REFERENCE_TYPE.INVOICE,
      lastInvoice[0]?.numInvoice,
    );

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

  async getRawInvoiceById(ctx: RequestContext, id: number): Promise<Invoice> {
    this.logger.log(ctx, `${this.getRawInvoiceById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.getById`);
    const invoice = await this.repository.findOne({ where: { id } });

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, invoice);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }
    return invoice;
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

    if (input.status && input.status === INVOICE_STATUS.CANCELLED) {
      this.logger.log(ctx, `${this.cancelInvoice.name} was called`);
      return this.cancelInvoice(ctx, invoiceId);
    }

    const errorMessages = [];
    // Conductor controls
    if (input.companyId && input.companyId != invoice.company.id) {
      try {
        const company = await this.companyService.getCompanyById(
          ctx,
          input.companyId,
        );
        invoice.company = plainToInstance(Company, company);
      } catch {
        errorMessages.push(`Conductor with ID '${input.companyId}'  Not Found`);
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

    try {
      // cancel invoice
      this.logger.log(ctx, `calling ${this.cancelInvoice.name}`);
      await this.cancelInvoice(ctx, id);
      this.logger.log(ctx, `calling ${InvoiceRepository.name}.remove`);
      await this.repository.remove(invoice);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }

  async cancelInvoice(
    ctx: RequestContext,
    id: number,
  ): Promise<InvoiceOutputDto> {
    this.logger.log(ctx, `${this.cancelInvoice.name} was called`);

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.getById`);
    const invoice = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, invoice);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    console.log('================ 1 ==================');

    const connection = this.repository.manager.connection;
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      // update Invoice

      queryRunner.query(`
        UPDATE invoices
        SET status = '${INVOICE_STATUS.CANCELLED}'
        WHERE id = ${id};
      `);

      // update Travels
      queryRunner.query(`
        UPDATE travels
        SET invoiceId = NULL
        WHERE invoiceId = ${id};
      `);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }    

    return plainToInstance(
      InvoiceOutputDto,
      {
        ...invoice,
        status: INVOICE_STATUS.CANCELLED,
      },
      { excludeExtraneousValues: true },
    );
  }

  
  async getStatistics(
    ctx: RequestContext,
  ) : Promise<InvoiceStatsOutputDto> {
    this.logger.log(ctx, `${this.getStatistics.name} was called`);

    this.logger.log(ctx, `calling ${InvoiceRepository.name}.getStatistics`);
    const stats = await this.repository.getStatistics();

    return plainToInstance(InvoiceStatsOutputDto, stats, {
      excludeExtraneousValues: true,
    });
  }
}
