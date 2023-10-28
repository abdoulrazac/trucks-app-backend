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
import { ContractCreateDto } from '../dtos/contract-create.dto';
import { ContractOrderDto } from '../dtos/contract-order.dto';
import { ContractOutputDto } from '../dtos/contract-output.dto';
import { ContractParamDto } from '../dtos/contract-param.dto';
import { ContractUpdateDto } from '../dtos/contract-update.dto';
import { Contract } from '../entities/contract.entity';
import { ContractRepository } from '../repositories/contract.repository';
import { ContractAclService } from './contract-acl.service';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class ContractService {
  constructor(
    private repository: ContractRepository,
    private aclService: ContractAclService,
    private userService: UserService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ContractService.name);
  }

  async getContracts(
    ctx: RequestContext,
    filters: ContractParamDto,
    order: ContractOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ contracts: ContractOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getContracts.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${ContractRepository.name}.findAndCount`);
    const [contracts, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      relations: {
        author: true,
      },
      take: limit,
      skip: offset,
    });

    const contractsOutput = plainToInstance(ContractOutputDto, contracts, {
      excludeExtraneousValues: true,
    });

    return { contracts: contractsOutput, count };
  }

  async createContract(
    ctx: RequestContext,
    input: ContractCreateDto,
  ): Promise<ContractOutputDto> {
    this.logger.log(ctx, `${this.createContract.name} was called`);

    const contract = plainToInstance(Contract, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, contract);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    try {
      const author = await this.userService.getUserById(ctx, input.authorId);
      contract.author = plainToInstance(User, author);
    } catch {
      throw new NotFoundException(
        `Author with ID '${input.authorId}'  Not Found`,
      );
    }

    this.logger.log(ctx, `calling ${ContractRepository.name}.save`);
    const savedContract = await this.repository.save(contract);

    return plainToInstance(ContractOutputDto, savedContract, {
      excludeExtraneousValues: true,
    });
  }

  async getContractById(
    ctx: RequestContext,
    id: number,
  ): Promise<ContractOutputDto> {
    this.logger.log(ctx, `${this.getContractById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${ContractRepository.name}.getById`);
    const contract = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, contract);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(ContractOutputDto, contract, {
      excludeExtraneousValues: true,
    });
  }

  async updateContract(
    ctx: RequestContext,
    contractId: number,
    input: ContractUpdateDto,
  ): Promise<ContractOutputDto> {
    this.logger.log(ctx, `${this.updateContract.name} was called`);

    this.logger.log(ctx, `calling ${ContractRepository.name}.getById`);
    const contract = await this.repository.getById(contractId);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, contract);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    if (input.authorId) {
      try {
        const author = await this.userService.getUserById(ctx, input.authorId);
        contract.author = plainToInstance(User, author);
      } catch {
        throw new NotFoundException(
          `Author with ID '${input.authorId}'  Not Found`,
        );
      }
    }

    const updatedContract: Contract = {
      ...contract,
      ...plainToInstance(Contract, input),
    };

    this.logger.log(ctx, `calling ${ContractRepository.name}.save`);
    const savedContract = await this.repository.save(updatedContract);

    return plainToInstance(ContractOutputDto, savedContract, {
      excludeExtraneousValues: true,
    });
  }

  async deleteContract(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteContract.name} was called`);

    this.logger.log(ctx, `calling ${ContractRepository.name}.getById`);
    const contract = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, contract);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${ContractRepository.name}.remove`);
    try {
      await this.repository.remove(contract);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
