import {
  Injectable,
  NotAcceptableException, 
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as path from 'path';

import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { createUploadFile, getFilePath, orderClean, whereClauseClean } from '../../shared/helpers';
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
import { ConfigService } from '@nestjs/config';
import { DOCS_TYPES_AVATAR } from '../../shared/constants';

@Injectable()
export class CompanyService {
  basePathAvatar : string ;
  maxSize : number ;
  constructor(
    private configService: ConfigService,
    private repository: CompanyRepository,
    private aclService: CompanyAclService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CompanyService.name);
    this.basePathAvatar = this.configService.get<string>('file.uploadDestinationAvatar');
    this.maxSize = this.configService.get<number>('file.maxSize');
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
    fileUploaded: Express.Multer.File = null,
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

    const errorMessages: string[] = [];

    // Check if email exists
    try {
      const user = await this.repository.findOne({
        where: { email: input.email },
      });
      if (user) {
        errorMessages.push(`Is already company with email '${input.email}' !`);
      }
    } catch {
      errorMessages.push(`Cannot check email '${input.email}' !`);
    }
    

    // Check if numIfu exists 
    try {
      const user = await this.repository.findOne({
        where: { numIfu: input.numIfu },
      });
      if (user) {
        errorMessages.push(`Is already company with numIfu '${input.numIfu}' !`);
      }
    } catch {
      errorMessages.push(`Cannot check numIfu '${input.numIfu}' !`);
    } 

    // Check if numRccm exists 
    try {
      const user = await this.repository.findOne({
        where: { numRccm: input.numRccm },
      });
      if (user) {
        errorMessages.push(`Is already company with numRccm '${input.numRccm}' !`);
      }
    } catch {
      errorMessages.push(`Cannot check numRccm '${input.numRccm}' !`);
    } 

    // File upload logic
    let fileName: string | null = null;
    if (fileUploaded) {
      const fileSize = fileUploaded.size;
      const fileExtension = path.extname(fileUploaded.originalname);
      fileName = `${company.id?company.id:0}-${new Date().getTime()}${fileExtension}`;

      if (Number(fileSize) > this.maxSize) {
        errorMessages.push(`File max size is ${this.maxSize.toString().slice(0, 1)}M`);
      } 

      if (!DOCS_TYPES_AVATAR.includes(fileExtension)) {
        errorMessages.push(`Only [${DOCS_TYPES_AVATAR}] are allowed !`);
      }
    }
    // Check if there is an error
    if (errorMessages.length != 0) {
      throw new NotAcceptableException(errorMessages);
    }

    if (fileUploaded) {
      this.logger.log(ctx, `calling ${createUploadFile.name}.save`);
      company.avatar = await createUploadFile(
        this.basePathAvatar,
        fileName,
        fileUploaded.buffer,
      );
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
    fileUploaded: Express.Multer.File = null,
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

    const errorMessages: string[] = [];

    // Check if email exists
    if (input.email && input.email != company.email) {
      try {
        const user = await this.repository.findOne({
          where: { email: input.email },
        });
        if (user) {
          errorMessages.push(`Is already company with email '${input.email}' !`);
        }
      } catch {
        errorMessages.push(`Cannot check email '${input.email}' !`);
      }
    }

    // Check if numIfu exists
    if (input.numIfu && input.numIfu != company.numIfu) {
      try {
        const user = await this.repository.findOne({
          where: { numIfu: input.numIfu },
        });
        if (user) {
          errorMessages.push(`Is already company with numIfu '${input.numIfu}' !`);
        }
      } catch {
        errorMessages.push(`Cannot check numIfu '${input.numIfu}' !`);
      }
    }

    // Check if numRccm exists
    if (input.numRccm && input.numRccm != company.numRccm) {
      try {
        const user = await this.repository.findOne({
          where: { numRccm: input.numRccm },
        });
        if (user) {
          errorMessages.push(`Is already company with numRccm '${input.numRccm}' !`);
        }
      } catch {
        errorMessages.push(`Cannot check numRccm '${input.numRccm}' !`);
      }
    }

     // File upload logic
     let fileName: string | null = null;
     if (fileUploaded) {
       const fileSize = fileUploaded.size;
       const fileExtension = path.extname(fileUploaded.originalname);
       fileName = `${company.id?company.id:0}-${new Date().getTime()}${fileExtension}`;
 
       if (Number(fileSize) > this.maxSize) {
         errorMessages.push(`File max size is ${this.maxSize.toString().slice(0, 1)}M`);
       } 
 
       if (!DOCS_TYPES_AVATAR.includes(fileExtension)) {
         errorMessages.push(`Only [${DOCS_TYPES_AVATAR}] are allowed !`);
       }
     }
     // Check if there is an error
     if (errorMessages.length != 0) {
       throw new NotAcceptableException(errorMessages);
     }
 
     if (fileUploaded) {
       this.logger.log(ctx, `calling ${createUploadFile.name}.save`);
       company.avatar = await createUploadFile(
         this.basePathAvatar,
         fileName,
         fileUploaded.buffer,
       );
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

  async downloadAvatarByUserId(
    ctx: RequestContext,
    companyId: number,
  ): Promise<string> {
    this.logger.log(ctx, `${this.downloadAvatarByUserId.name} was called`);

    const company = await this.repository.getById(companyId);

    const actor: Actor = ctx.user;
    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, company);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const filePath =  await getFilePath(company.avatar)
    if (!company.avatar || !filePath ){
      throw new NotFoundException('Avatar Not Found');
    }
    return filePath
  }
}
