import {BadRequestException, Injectable, NotAcceptableException, UnauthorizedException,} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';

import {Action} from '../../shared/acl/action.constant';
import {Actor} from '../../shared/acl/actor.constant';
import {orderClean, whereClauseClean} from '../../shared/helpers';
import {AppLogger} from '../../shared/logger/logger.service';
import {RequestContext} from '../../shared/request-context/request-context.dto';
import {CategoryCreateDto} from '../dtos/category-create.dto';
import {CategoryOrderDto} from '../dtos/category-order.dto';
import {CategoryOutputDto} from '../dtos/category-output.dto';
import {CategoryParamDto} from '../dtos/category-param.dto';
import {CategoryUpdateDto} from '../dtos/category-update.dto';
import {Category} from '../entities/category.entity';
import {CategoryRepository} from '../repositories/category.repository';
import {CategoryAclService} from './category-acl.service'; 

@Injectable()
export class CategoryService {
  constructor(
    private repository: CategoryRepository, 
    private aclService: CategoryAclService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CategoryService.name);
  }

  async getCategories(
    ctx: RequestContext,
    filters: CategoryParamDto,
    order: CategoryOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ categories: CategoryOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getCategories.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${CategoryRepository.name}.findAndCount`);
    const [categories, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      relations: {
        group: true,
      },
      order: orderClean(order),
      take: limit,
      skip: offset,
    });

    const categoriesOutput = plainToInstance(CategoryOutputDto, categories, {
      excludeExtraneousValues: true,
    });

    return { categories: categoriesOutput, count };
  }

  async createCategory(
    ctx: RequestContext,
    input: CategoryCreateDto,
  ): Promise<CategoryOutputDto> {
    this.logger.log(ctx, `${this.createCategory.name} was called`);

    const category = plainToInstance(Category, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, category);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if (input.groupId) {
      try {
        this.logger.log(ctx, `calling ${CategoryRepository.name}.getById`);
        const group = await this.repository.getById(input.groupId);
        category.group = plainToInstance(Category, group);
      } catch {
        throw new BadRequestException(`Category group with ID '${input.groupId}' is Not Found`);
      }
    }

    this.logger.log(ctx, `calling ${CategoryRepository.name}.save`);
    const savedCategory = await this.repository.save(category); 

    this.logger.log(ctx, `calling ${CategoryRepository.name}.getById`);
    const categoryOutput = await this.repository.getById(savedCategory.id);


    return plainToInstance(CategoryOutputDto, categoryOutput, {
      excludeExtraneousValues: true,
    });
  }

  async getCategoryById(
    ctx: RequestContext,
    id: number,
  ): Promise<CategoryOutputDto> {
    this.logger.log(ctx, `${this.getCategoryById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${CategoryRepository.name}.getById`);
    const category = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, category);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(CategoryOutputDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async updateCategory(
    ctx: RequestContext,
    categoryId: number,
    input: CategoryUpdateDto,
  ): Promise<CategoryOutputDto> {
    this.logger.log(ctx, `${this.updateCategory.name} was called`);

    this.logger.log(ctx, `calling ${CategoryRepository.name}.getById`);
    const category = await this.repository.getById(categoryId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, category);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if(input.groupId){
      try {
        this.logger.log(ctx, `calling ${CategoryRepository.name}.getById`);
        const group = await this.repository.getById(input.groupId);
        category.group = plainToInstance(Category, group);
      } catch {
        throw new BadRequestException(`Category group with ID '${input.groupId}' is Not Found`);
      }
    }

    const updatedCategory: Category = {
      ...category,
      ...plainToInstance(Category, input),
    };

    this.logger.log(ctx, `calling ${CategoryRepository.name}.save`);
    const savedCategory = await this.repository.save(updatedCategory);

    return plainToInstance(CategoryOutputDto, savedCategory, {
      excludeExtraneousValues: true,
    });
  }

  async deleteCategory(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteCategory.name} was called`);

    this.logger.log(ctx, `calling ${CategoryRepository.name}.getById`);
    const category = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, category);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${CategoryRepository.name}.remove`);
    try {
      await this.repository.remove(category);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
