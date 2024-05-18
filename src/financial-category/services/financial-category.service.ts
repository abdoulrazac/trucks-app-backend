import { Injectable, NotAcceptableException, UnauthorizedException,} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';

import {Action} from '../../shared/acl/action.constant';
import {Actor} from '../../shared/acl/actor.constant';
import {orderClean, whereClauseClean} from '../../shared/helpers';
import {AppLogger} from '../../shared/logger/logger.service';
import {RequestContext} from '../../shared/request-context/request-context.dto';
import {FinancialCategoryCreateDto} from '../dtos/financial-category-create.dto';
import {FinancialCategoryOrderDto} from '../dtos/financial-category-order.dto';
import {FinancialCategoryOutputDto} from '../dtos/financial-category-output.dto';
import {FinancialCategoryParamDto} from '../dtos/financial-category-param.dto';
import {FinancialCategoryUpdateDto} from '../dtos/financial-category-update.dto';
import {FinancialCategory} from '../entities/financial-category.entity';
import {FinancialCategoryRepository} from '../repositories/financial-category.repository';
import {FinancialCategoryAclService} from './financial-category-acl.service'; 

@Injectable()
export class FinancialCategoryService {
  constructor(
    private repository: FinancialCategoryRepository, 
    private aclService: FinancialCategoryAclService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FinancialCategoryService.name);
  }

  async getFinancialCategories(
    ctx: RequestContext,
    filters: FinancialCategoryParamDto,
    order: FinancialCategoryOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ categories: FinancialCategoryOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getFinancialCategories.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${FinancialCategoryRepository.name}.findAndCount`);
    const [categories, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      take: limit,
      skip: offset,
    });

    const categoriesOutput = plainToInstance(FinancialCategoryOutputDto, categories, {
      excludeExtraneousValues: true,
    });

    return { categories: categoriesOutput, count };
  }

  async createFinancialCategory(
    ctx: RequestContext,
    input: FinancialCategoryCreateDto,
  ): Promise<FinancialCategoryOutputDto> {
    this.logger.log(ctx, `${this.createFinancialCategory.name} was called`);

    const financialFinancialCategory = plainToInstance(FinancialCategory, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, financialFinancialCategory);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${FinancialCategoryRepository.name}.save`);
    const savedFinancialCategory = await this.repository.save(financialFinancialCategory);


    return plainToInstance(FinancialCategoryOutputDto, savedFinancialCategory, {
      excludeExtraneousValues: true,
    });
  }

  async getFinancialCategoryById(
    ctx: RequestContext,
    id: number,
  ): Promise<FinancialCategoryOutputDto> {
    this.logger.log(ctx, `${this.getFinancialCategoryById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${FinancialCategoryRepository.name}.getById`);
    const financialFinancialCategory = await this.repository.findOne({where: {id}});

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, financialFinancialCategory);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(FinancialCategoryOutputDto, financialFinancialCategory, {
      excludeExtraneousValues: true,
    });
  }

  async updateFinancialCategory(
    ctx: RequestContext,
    financialFinancialCategoryId: number,
    input: FinancialCategoryUpdateDto,
  ): Promise<FinancialCategoryOutputDto> {
    this.logger.log(ctx, `${this.updateFinancialCategory.name} was called`);

    this.logger.log(ctx, `calling ${FinancialCategoryRepository.name}.getById`);
    const financialFinancialCategory = await this.repository.findOne({ where : {id : financialFinancialCategoryId}});

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, financialFinancialCategory);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const updatedFinancialCategory: FinancialCategory = {
      ...financialFinancialCategory,
      ...plainToInstance(FinancialCategory, input),
    };

    this.logger.log(ctx, `calling ${FinancialCategoryRepository.name}.save`);
    const savedFinancialCategory = await this.repository.save(updatedFinancialCategory);

    return plainToInstance(FinancialCategoryOutputDto, savedFinancialCategory, {
      excludeExtraneousValues: true,
    });
  }

  async deleteFinancialCategory(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteFinancialCategory.name} was called`);

    this.logger.log(ctx, `calling ${FinancialCategoryRepository.name}.getById`);
    const financialFinancialCategory = await this.repository.findOne({where: {id}});

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, financialFinancialCategory);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${FinancialCategoryRepository.name}.remove`);
    try {
      await this.repository.remove(financialFinancialCategory);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
