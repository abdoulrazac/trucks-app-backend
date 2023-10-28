import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { orderClean, whereClauseClean } from '../../shared/helpers';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CompanyCreateDto } from '../dtos/company-create.dto';
import { CompanyOrderDto } from '../dtos/company-order.dto';
import { CompanyOutputDto } from '../dtos/company-output.dto';
import { CompanyParamDto } from '../dtos/company-param.dto';
import { CompanyUpdateDto } from '../dtos/company-update.dto';
import { Company } from '../entities/company.entity';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyAclService } from './company-acl.service';

@Injectable()
export class CompanyService {
  constructor(
    private repository: CompanyRepository,
    private aclService: CompanyAclService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CompanyService.name);
  }

  async getCompanies(
    ctx: RequestContext,
    filters: CompanyParamDto,
    order: CompanyOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ companies: CompanyOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getCompanies.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${CompanyRepository.name}.findAndCount`);
    const [companies, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      take: limit,
      skip: offset,
    });

    const companiesOutput = plainToInstance(CompanyOutputDto, companies, {
      excludeExtraneousValues: true,
    });

    return { companies: companiesOutput, count };
  }

  async createCompany(
    ctx: RequestContext,
    input: CompanyCreateDto,
  ): Promise<CompanyOutputDto> {
    this.logger.log(ctx, `${this.createCompany.name} was called`);

    const company = plainToInstance(Company, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, company);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${CompanyRepository.name}.save`);
    const savedCompany = await this.repository.save(company);

    return plainToInstance(CompanyOutputDto, savedCompany, {
      excludeExtraneousValues: true,
    });
  }

  async getCompanyById(
    ctx: RequestContext,
    id: number,
  ): Promise<CompanyOutputDto> {
    this.logger.log(ctx, `${this.getCompanyById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${CompanyRepository.name}.getById`);
    const company = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, company);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(CompanyOutputDto, company, {
      excludeExtraneousValues: true,
    });
  }

  async updateCompany(
    ctx: RequestContext,
    companyId: number,
    input: CompanyUpdateDto,
  ): Promise<CompanyOutputDto> {
    this.logger.log(ctx, `${this.updateCompany.name} was called`);

    this.logger.log(ctx, `calling ${CompanyRepository.name}.getById`);
    const company = await this.repository.getById(companyId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, company);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const updatedCompany: Company = {
      ...company,
      ...plainToInstance(Company, input),
    };

    this.logger.log(ctx, `calling ${CompanyRepository.name}.save`);
    const savedCompany = await this.repository.save(updatedCompany);

    return plainToInstance(CompanyOutputDto, savedCompany, {
      excludeExtraneousValues: true,
    });
  }

  async deleteCompany(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteCompany.name} was called`);

    this.logger.log(ctx, `calling ${CompanyRepository.name}.getById`);
    const company = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, company);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${CompanyRepository.name}.remove`);
    try {
      await this.repository.remove(company);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
