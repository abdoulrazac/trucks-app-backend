import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { plainToInstance } from 'class-transformer';
import * as path from 'path';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { Breakdown } from '../../breakdown/entities/breakdown.entity';
import { BreakdownService } from '../../breakdown/services/breakdown.service';
import { Company } from '../../company/entities/company.entity';
import { CompanyService } from '../../company/services/company.service';
import { Contract } from '../../contract/entities/contract.entity';
import { ContractService } from '../../contract/services/contract.service';
import { Expense } from '../../expense/entities/expense.entity';
import { ExpenseService } from '../../expense/services/expense.service';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import { DOCS_TYPES } from '../../shared/constants';
import {
  createUploadFile,
  getFilePath,
  moveToTrash,
  orderClean,
  whereClauseClean,
} from '../../shared/helpers';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { Travel } from '../../travel/entities/travel.entity';
import { TravelService } from "../../travel/services/travel.service";
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { FileCreateDto } from '../dtos/file-create.dto';
import { FileOrderDto } from '../dtos/file-order.dto';
import { FileOutputDto } from '../dtos/file-output.dto';
import { FileParamDto } from '../dtos/file-param.dto';
import { FileUpdateDto } from '../dtos/file-update.dto';
import { File } from '../entities/file.entity';
import { FileRepository } from '../repositories/file.repository';
import { FileAclService } from './file-acl.service';

@Injectable()
export class FileService {
  basePath: string;
  maxSize: number;
  constructor(
    private configService: ConfigService,
    private repository: FileRepository,
    private aclService: FileAclService,
    private userService: UserService,
    private expenseService: ExpenseService,
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private contractService: ContractService,
    private travelService: TravelService,
    private breakdownService: BreakdownService,
    private vehicleService: VehicleService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FileService.name);
    this.basePath = this.configService.get<string>('file.uploadDestination');
    this.maxSize = this.configService.get<number>('file.maxSize');
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM, {
    //'* * * * *'
    name: 'triggerNotifications',
    timeZone: 'UTC',
  })
  async triggerNotifications() {
    this.logger.internalLog(
      `Cron: ${this.triggerNotifications.name} was called`,
    );
    const files = await this.repository.getFutureExpiredFiles();
    console.log('triggerNotifications was called');
    console.log(files);
  }

  async getFiles(
    ctx: RequestContext,
    filters: FileParamDto,
    order: FileOrderDto,
    limit: number,
    offset: number,
  ): Promise<{ files: FileOutputDto[]; count: number }> {
    this.logger.log(ctx, `${this.getFiles.name} was called`);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${FileRepository.name}.findAndCount`);
    const [files, count] = await this.repository.findAndCount({
      where: whereClauseClean(filters),
      order: orderClean(order),
      take: limit,
      skip: offset,
      relations: [
        'author',
        'company',
        'vehicle',
        'expense',
        'invoice',
        'contract',
        'breakdown',
      ],
    });

    const filesOutput = plainToInstance(FileOutputDto, files, {
      excludeExtraneousValues: true,
    });

    return { files: filesOutput, count };
  }

  async createFile(
    ctx: RequestContext,
    input: FileCreateDto,
    fileUploaded: Express.Multer.File,
  ): Promise<FileOutputDto> {
    this.logger.log(ctx, `${this.createFile.name} was called`);

    const file = plainToInstance(File, input);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, file);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const errorMessages: string[] = [];
    const basePathWithYear = join(
      this.basePath,
      new Date().getFullYear().toString(),
    );

    if (input.authorId) {
      try {
        const user = await this.userService.getUserById(ctx, input.authorId);
        file.author = plainToInstance(User, user);
      } catch {
        errorMessages.push(`Author with ID '${input.authorId}'  Not Found`);
      }
    }
    if (input.companyId) {
      try {
        const company = await this.companyService.getCompanyById(
          ctx,
          input.companyId,
        );
        file.company = plainToInstance(Company, company);
      } catch {
        errorMessages.push(`Company with ID '${input.companyId}'  Not Found`);
      }
    }
    if (input.vehicleId) {
      try {
        const vehicle = await this.vehicleService.getVehicleById(
          ctx,
          input.vehicleId,
        );
        file.vehicle = plainToInstance(Vehicle, vehicle);
      } catch {
        errorMessages.push(`Vehicle with ID '${input.vehicleId}'  Not Found`);
      }
    }
    if (input.expenseId) {
      try {
        const expense = await this.expenseService.getExpenseById(
          ctx,
          input.expenseId,
        );
        file.expense = plainToInstance(Expense, expense);
      } catch {
        errorMessages.push(`Expense with ID '${input.expenseId}'  Not Found`);
      }
    }
    if (input.invoiceId) {
      try {
        const invoice = await this.invoiceService.getInvoiceById(
          ctx,
          input.invoiceId,
        );
        file.invoice = plainToInstance(Invoice, invoice);
      } catch {
        errorMessages.push(`Invoice with ID '${input.invoiceId}'  Not Found`);
      }
    }
    if (input.contractId) {
      try {
        const contract = await this.contractService.getContractById(
          ctx,
          input.contractId,
        );
        file.contract = plainToInstance(Contract, contract);
      } catch {
        errorMessages.push(`Contract with ID '${input.contractId}'  Not Found`);
      }
    }
    
    if (input.travelId) {
      try {
        const travel = await this.travelService.getTravelById(
          ctx,
          input.travelId,
        );
        file.travel = plainToInstance(Travel, travel);
      } catch {
        errorMessages.push(`Travel with ID '${input.travelId}'  Not Found`);
      }
    }

    if (input.breakdownId) {
      try {
        const breakdown = await this.breakdownService.getBreakdownById(
          ctx,
          input.breakdownId,
        );
        file.breakdown = plainToInstance(Breakdown, breakdown);
      } catch {
        errorMessages.push(
          `Breakdown with ID '${input.breakdownId}'  Not Found`,
        );
      }
    }

    if (fileUploaded) {
      file.size = fileUploaded.size;
      file.extension = path
        .extname(fileUploaded.originalname)
        .toLocaleLowerCase();

      if (Number(file.size) > this.maxSize) {
        errorMessages.push(
          `File max size is ${this.maxSize.toString().slice(0, 1)}M`,
        );
      }

      if (!DOCS_TYPES.includes(file.extension)) {
        errorMessages.push(`Only [${DOCS_TYPES}] are allowed !`);
      }
    } else {
      errorMessages.push(`File is required !`);
    }
    if (errorMessages.length != 0) {
      throw new BadRequestException(errorMessages);
    }

    this.logger.log(ctx, `calling ${FileRepository.name}.save`);
    const fileName = this.generateFileName(ctx.user, file);
    file.link = fileUploaded
      ? await createUploadFile(basePathWithYear, fileName, fileUploaded.buffer)
      : '';
    const savedFile = await this.repository.save(file);

    return plainToInstance(FileOutputDto, savedFile, {
      excludeExtraneousValues: true,
    });
  }

  async getFileById(ctx: RequestContext, id: number): Promise<FileOutputDto> {
    this.logger.log(ctx, `${this.getFileById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${FileRepository.name}.getById`);
    const file = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, file);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    return plainToInstance(FileOutputDto, file, {
      excludeExtraneousValues: true,
    });
  }

  async downloadFileById(ctx: RequestContext, id: number): Promise<string> {
    this.logger.log(ctx, `${this.downloadFileById.name} was called`);

    const actor: Actor = ctx.user;

    this.logger.log(ctx, `calling ${FileRepository.name}.getById`);
    const file = await this.repository.getById(id);

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, file);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const filePath = await getFilePath(file.link);
    if (!file.link || !filePath) {
      throw new NotFoundException('File Not Found');
    }
    return filePath;
  }

  async updateFile(
    ctx: RequestContext,
    fileId: number,
    input: FileUpdateDto,
    fileUploaded: Express.Multer.File,
  ): Promise<FileOutputDto> {
    this.logger.log(ctx, `${this.updateFile.name} was called`);

    this.logger.log(ctx, `calling ${FileRepository.name}.getById`);
    const file = await this.repository.getFullById(fileId);

    const actor: Actor = ctx.user;
    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, file);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    const errorMessages: string[] = [];
    const basePathWithYear = join(
      this.basePath,
      new Date().getFullYear().toString(),
    );

    if (input.authorId && input.authorId != file.author.id) {
      try {
        const user = await this.userService.getUserById(ctx, input.authorId);
        file.author = plainToInstance(User, user);
      } catch {
        errorMessages.push(`Author with ID '${input.authorId}'  Not Found`);
      }
    }

    if (input.companyId && input.companyId != file.company.id) {
      try {
        const company = await this.companyService.getCompanyById(
          ctx,
          input.companyId,
        );
        file.company = plainToInstance(Company, company);
      } catch {
        errorMessages.push(`Company with ID '${input.companyId}'  Not Found`);
      }
    }
    if (input.vehicleId && input.vehicleId != file.vehicle.id) {
      try {
        const vehicle = await this.vehicleService.getVehicleById(
          ctx,
          input.vehicleId,
        );
        file.vehicle = plainToInstance(Vehicle, vehicle);
      } catch {
        errorMessages.push(`Vehicle with ID '${input.vehicleId}'  Not Found`);
      }
    }
    if (input.expenseId && input.expenseId != file.expense.id) {
      try {
        const expense = await this.expenseService.getExpenseById(
          ctx,
          input.expenseId,
        );
        file.expense = plainToInstance(Expense, expense);
      } catch {
        errorMessages.push(`Expense with ID '${input.authorId}'  Not Found`);
      }
    }
    if (input.invoiceId && input.invoiceId != file.invoice.id) {
      try {
        const invoice = await this.invoiceService.getInvoiceById(
          ctx,
          input.invoiceId,
        );
        file.invoice = plainToInstance(Invoice, invoice);
      } catch {
        errorMessages.push(`Invoice with ID '${input.invoiceId}'  Not Found`);
      }
    }
    if (input.contractId && input.contractId != file.contract.id) {
      try {
        const contract = await this.contractService.getContractById(
          ctx,
          input.contractId,
        );
        file.contract = plainToInstance(Contract, contract);
      } catch {
        errorMessages.push(`Contract with ID '${input.contractId}'  Not Found`);
      }
    }
    if (input.travelId && input.travelId != file.travel.id) {
      try {
        const travel = await this.travelService.getTravelById(
          ctx,
          input.travelId,
        );
        file.travel = plainToInstance(Travel, travel);
      } catch {
        errorMessages.push(`Travel with ID '${input.travelId}'  Not Found`);
      }
    }

    if (input.breakdownId && input.breakdownId != file.breakdown.id) {
      try {
        const breakdown = await this.breakdownService.getBreakdownById(
          ctx,
          input.breakdownId,
        );
        file.breakdown = plainToInstance(Breakdown, breakdown);
      } catch {
        errorMessages.push(
          `Breakdown with ID '${input.breakdownId}'  Not Found`,
        );
      }
    }

    if (fileUploaded) {
      file.size = fileUploaded.size;
      file.extension = path.extname(fileUploaded.originalname).toLowerCase();

      if (Number(file.size) > this.maxSize) {
        errorMessages.push(
          `File max size is ${this.maxSize.toString().slice(0, 1)}M`,
        );
      }

      if (!DOCS_TYPES.includes(file.extension)) {
        errorMessages.push(`Only [${DOCS_TYPES}] are allowed !`);
      }
    }
    if (errorMessages.length != 0) {
      throw new BadRequestException(errorMessages);
    }

    this.logger.log(ctx, `calling ${FileRepository.name}.save`);
    if (fileUploaded) {
      await moveToTrash(this.basePath, file.link);
      const fileName = this.generateFileName(ctx.user, file);
      file.link = await createUploadFile(
        basePathWithYear,
        fileName,
        fileUploaded.buffer,
      );
    }

    const updatedFile: File = {
      ...file,
      ...plainToInstance(File, input),
    };

    const savedFile = await this.repository.save(updatedFile);

    return plainToInstance(FileOutputDto, savedFile, {
      excludeExtraneousValues: true,
    });
  }

  async deleteFile(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteFile.name} was called`);

    this.logger.log(ctx, `calling ${FileRepository.name}.getById`);
    const file = await this.repository.getById(id);

    const actor: Actor = ctx.user;

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, file);
    if (!isAllowed) {
      throw new UnauthorizedException();
    }

    this.logger.log(ctx, `calling ${FileRepository.name}.remove`);
    try {
      await this.repository.remove(file);
      await moveToTrash(this.basePath, file.link);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }

  generateFileName(actor: Actor, file: File): string {
    let fileName = '';
    fileName += 'u' + (actor.id ? actor.id : 0).toString();
    fileName += '-a' + (file.author?.id ? file.author.id : 0).toString();
    fileName += '-c' + (file.company?.id ? file.company.id : 0).toString();
    fileName += '-v' + (file.vehicle?.id ? file.vehicle.id : 0).toString();
    fileName += '-e' + (file.expense?.id ? file.expense.id : 0).toString();
    fileName += '-i' + (file.invoice?.id ? file.invoice.id : 0).toString();
    fileName += '-t' + (file.travel?.id ? file.travel.id : 0).toString();
    fileName += '-ct' + (file.contract?.id ? file.contract.id : 0).toString();
    fileName += '_' + uuidv4() + file.extension;

    return fileName;
  }

}
