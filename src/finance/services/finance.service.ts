import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FINANCIAL_TYPE, INVOICE_STATUS, REFERENCE_TYPE } from 'src/shared/constants';
import { nextReference } from 'src/shared/helpers/reference-generator';

import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { orderClean, whereClauseClean } from '../../shared/helpers';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { FinanceCreateDto } from '../dtos/finance-create.dto';
import { FinanceOrderDto } from '../dtos/finance-order.dto';
import { FinanceOutputDto } from '../dtos/finance-output.dto';
import { FinanceParamDto } from '../dtos/finance-param.dto';
import { FinanceStatsOutputDto } from '../dtos/finance-stats-output.dto';
import { FinanceUpdateDto } from '../dtos/finance-update.dto';
import { Finance } from '../entities/finance.entity';
import { FinanceRepository } from '../repositories/finance.repository';
import { Breakdown } from "./../../breakdown/entities/breakdown.entity";
import { BreakdownService } from "./../../breakdown/services/breakdown.service";
import { Invoice } from "./../../invoice/entities/invoice.entity";
import { InvoiceService } from "./../../invoice/services/invoice.service";
import { User } from "./../../user/entities/user.entity";
import { UserService } from "./../../user/services/user.service";
import { FinanceAclService } from './finance-acl.service';

@Injectable()
export class FinanceService {
  constructor(
    private repository: FinanceRepository,
    private aclService: FinanceAclService,
    private vehicleService: VehicleService,
    private breakdownService: BreakdownService,
    private invoiceService: InvoiceService,
    private userService: UserService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FinanceService.name);
  }

  async getFinances(
    ctx: RequestContext,
    filters: FinanceParamDto,
    order: FinanceOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ finances: FinanceOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getFinances.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${FinanceRepository.name}.findAndCount`);
    const [finances, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      relations: {
        vehicle: true,
        breakdown: true,
        user: true,
        invoice: true,
      },
      take: limit,
      skip: offset,
    });

    const financesOutput = plainToInstance(FinanceOutputDto, finances, {
      excludeExtraneousValues: true,
    });

    return { finances : financesOutput, count };
  }

  async createFinance(
    ctx: RequestContext,
    input: FinanceCreateDto,
  ): Promise<FinanceOutputDto> {
    this.logger.log(ctx, `${this.createFinance.name} was called`);

    const finance = plainToInstance(Finance, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, finance);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if(input.vehicleId){
      try {
        const vehicle = await this.vehicleService.getVehicleById(
          ctx,
          input.vehicleId,
        );
        finance.vehicle = plainToInstance(Vehicle, vehicle);
      } catch {
        throw new NotFoundException(
          `Vehicle with ID '${input.vehicleId}'  Not Found`,
        );
      }
    }

    if(input.breakdownId){
      try {
        const breakdown = await this.breakdownService.getBreakdownById(
          ctx,
          input.breakdownId,
        );
        finance.breakdown = plainToInstance(Breakdown, breakdown);
      } catch {
        throw new NotFoundException(
          `Breakdown with ID '${input.breakdownId}'  Not Found`,
        );
      }
    }

    if(input.invoiceId){
      try {
        const invoice = await this.invoiceService.getInvoiceById(
          ctx,
          input.invoiceId,
        );
        if(finance.type == FINANCIAL_TYPE.INCOME) {invoice.status = INVOICE_STATUS.PAID;}
        finance.invoice = plainToInstance(Invoice, invoice);
      } catch {
        throw new NotFoundException(
          `Invoice with ID '${input.invoiceId}'  Not Found`,
        );
      }
    }
    

    if(input.userId){
      try {
        const user = await this.userService.getUserById(
          ctx,
          input.userId,
        );
        finance.user = plainToInstance(User, user);
      } catch {
        throw new NotFoundException(
          `User with ID '${input.userId}'  Not Found`,
        );
      }
    }

    // transactionRef
    const lastFinance = await this.repository.find({order: {id: 'DESC'}, take: 1});
    finance.transactionRef = nextReference(REFERENCE_TYPE.FINANCE, lastFinance[0]?.transactionRef);

    this.logger.log(ctx, `calling ${FinanceRepository.name}.save`);
    const savedFinance = await this.repository.save(finance);

    return plainToInstance(FinanceOutputDto, savedFinance, {
      excludeExtraneousValues: true,
    });
  }

  async getFinanceById(
    ctx: RequestContext,
    id: number,
  ): Promise<FinanceOutputDto> {
    this.logger.log(ctx, `${this.getFinanceById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${FinanceRepository.name}.getById`);
    const finance = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, finance);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(FinanceOutputDto, finance, {
      excludeExtraneousValues: true,
    });
  }

  async updateFinance(
    ctx: RequestContext,
    financeId: number,
    input: FinanceUpdateDto,
  ): Promise<FinanceOutputDto> {
    this.logger.log(ctx, `${this.updateFinance.name} was called`);

    this.logger.log(ctx, `calling ${FinanceRepository.name}.getById`);
    const finance = await this.repository.getById(financeId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, finance);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if (input.vehicleId) {
      try {
        const vehicle = await this.vehicleService.getVehicleById(
          ctx,
          input.vehicleId,
        );
        finance.vehicle = plainToInstance(Vehicle, vehicle);
      } catch {
        throw new NotFoundException(
          `Vehicle with ID '${input.vehicleId}'  Not Found`,
        );
      }
    }

    if (input.breakdownId) {
      try {
        const breakdown = await this.breakdownService.getBreakdownById(
          ctx,
          input.breakdownId,
        );
        finance.breakdown = plainToInstance(Breakdown, breakdown);
      } catch {
        throw new NotFoundException(
          `Breakdown with ID '${input.breakdownId}'  Not Found`,
        );
      }
    }

    if (input.invoiceId) {
      try {
        const invoice = await this.invoiceService.getInvoiceById(
          ctx,
          input.invoiceId,
        );
        if(finance.type == FINANCIAL_TYPE.INCOME) {invoice.status = INVOICE_STATUS.PAID;}
        finance.invoice = plainToInstance(Invoice, invoice);
      } catch {
        throw new NotFoundException(
          `Invoice with ID '${input.invoiceId}'  Not Found`,
        );
      }
    }
    

    if (input.userId) {
      try {
        const user = await this.userService.getUserById(
          ctx,
          input.userId,
        );
        finance.user = plainToInstance(User, user);
      } catch {
        throw new NotFoundException(
          `User with ID '${input.userId}'  Not Found`,
        );
      }
    }

    const updatedFinance: Finance = {
      ...finance,
      ...plainToInstance(Finance, input),
    };

    this.logger.log(ctx, `calling ${FinanceRepository.name}.save`);
    const savedFinance = await this.repository.save(updatedFinance);

    return plainToInstance(FinanceOutputDto, savedFinance, {
      excludeExtraneousValues: true,
    });
  }

  async deleteFinance(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteFinance.name} was called`);

    this.logger.log(ctx, `calling ${FinanceRepository.name}.getById`);
    const finance = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, finance);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${FinanceRepository.name}.remove`);
    try {
      await this.repository.remove(finance);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }

  async getStatistics(
    ctx: RequestContext,
  ): Promise<FinanceStatsOutputDto> {
    this.logger.log(ctx, `${this.getStatistics.name} was called`);
    
    this.logger.log(ctx, `calling ${FinanceRepository.name}.getStatistics`);
    const stats = await this.repository.getStatistics();

    return plainToInstance(FinanceStatsOutputDto, stats, {
      excludeExtraneousValues: true,
    });
  }

}
