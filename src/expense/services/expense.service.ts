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
import { ExpenseCreateDto } from '../dtos/expense-create.dto';
import { ExpenseOrderDto } from '../dtos/expense-order.dto';
import { ExpenseOutputDto } from '../dtos/expense-output.dto';
import { ExpenseParamDto } from '../dtos/expense-param.dto';
import { ExpenseUpdateDto } from '../dtos/expense-update.dto';
import { Expense } from '../entities/expense.entity';
import { ExpenseRepository } from '../repositories/expense.repository';
import { ExpenseAclService } from './expense-acl.service';
import { CategoryService } from '../../category/services/category.service';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { Category } from '../../category/entities/category.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

@Injectable()
export class ExpenseService {
  constructor(
    private repository: ExpenseRepository,
    private aclService: ExpenseAclService,
    private categoryService: CategoryService,
    private vehicleService: VehicleService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ExpenseService.name);
  }

  async getExpenses(
    ctx: RequestContext,
    filters: ExpenseParamDto,
    order: ExpenseOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ expenses: ExpenseOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getExpenses.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${ExpenseRepository.name}.findAndCount`);
    const [expenses, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      relations: {
        vehicle: true,
        category: true,
      },
      take: limit,
      skip: offset,
    });

    const expensesOutput = plainToInstance(ExpenseOutputDto, expenses, {
      excludeExtraneousValues: true,
    });

    return { expenses: expensesOutput, count };
  }

  async createExpense(
    ctx: RequestContext,
    input: ExpenseCreateDto,
  ): Promise<ExpenseOutputDto> {
    this.logger.log(ctx, `${this.createExpense.name} was called`);

    const expense = plainToInstance(Expense, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, expense);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    try {
      const category = await this.categoryService.getCategoryById(
        ctx,
        input.categoryId,
      );
      expense.category = plainToInstance(Category, category);
    } catch {
      throw new NotFoundException(
        `Category with ID '${input.categoryId}'  Not Found`,
      );
    }
    try {
      const vehicle = await this.vehicleService.getVehicleById(
        ctx,
        input.vehicleId,
      );
      expense.vehicle = plainToInstance(Vehicle, vehicle);
    } catch {
      throw new NotFoundException(
        `Vehicle with ID '${input.vehicleId}'  Not Found`,
      );
    }

    this.logger.log(ctx, `calling ${ExpenseRepository.name}.save`);
    const savedExpense = await this.repository.save(expense);

    return plainToInstance(ExpenseOutputDto, savedExpense, {
      excludeExtraneousValues: true,
    });
  }

  async getExpenseById(
    ctx: RequestContext,
    id: number,
  ): Promise<ExpenseOutputDto> {
    this.logger.log(ctx, `${this.getExpenseById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${ExpenseRepository.name}.getById`);
    const expense = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, expense);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(ExpenseOutputDto, expense, {
      excludeExtraneousValues: true,
    });
  }
  async updateExpense(
    ctx: RequestContext,
    expenseId: number,
    input: ExpenseUpdateDto,
  ): Promise<ExpenseOutputDto> {
    this.logger.log(ctx, `${this.updateExpense.name} was called`);

    this.logger.log(ctx, `calling ${ExpenseRepository.name}.getById`);
    const expense = await this.repository.getById(expenseId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, expense);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if (input.categoryId) {
      try {
        const category = await this.categoryService.getCategoryById(
          ctx,
          input.categoryId,
        );
        expense.category = plainToInstance(Category, category);
      } catch {
        throw new NotFoundException(
          `Category with ID '${input.categoryId}'  Not Found`,
        );
      }
    }
    if (input.vehicleId) {
      try {
        const vehicle = await this.vehicleService.getVehicleById(
          ctx,
          input.vehicleId,
        );
        expense.vehicle = plainToInstance(Vehicle, vehicle);
      } catch {
        throw new NotFoundException(
          `Vehicle with ID '${input.vehicleId}'  Not Found`,
        );
      }
    }

    const updatedExpense: Expense = {
      ...expense,
      ...plainToInstance(Expense, input),
    };

    this.logger.log(ctx, `calling ${ExpenseRepository.name}.save`);
    const savedExpense = await this.repository.save(updatedExpense);

    return plainToInstance(ExpenseOutputDto, savedExpense, {
      excludeExtraneousValues: true,
    });
  }

  async deleteExpense(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteExpense.name} was called`);

    this.logger.log(ctx, `calling ${ExpenseRepository.name}.getById`);
    const expense = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, expense);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${ExpenseRepository.name}.remove`);
    try {
      await this.repository.remove(expense);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
