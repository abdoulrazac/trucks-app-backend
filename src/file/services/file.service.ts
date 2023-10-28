import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Action } from '../../shared/acl/action.constant';
import { Actor } from '../../shared/acl/actor.constant';
import {
  creteUploadFile,
  orderClean,
  readUploadFile,
  removeUploadFile,
  whereClauseClean,
} from '../../shared/helpers';
import { AppLogger } from '../../shared/logger/logger.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { FileCreateDto } from '../dtos/file-create.dto';
import { FileOrderDto } from '../dtos/file-order.dto';
import { FileOutputDto } from '../dtos/file-output.dto';
import { FileParamDto } from '../dtos/file-param.dto';
import { FileUpdateDto } from '../dtos/file-update.dto';
import { File } from '../entities/file.entity';
import { FileRepository } from '../repositories/file.repository';
import { FileAclService } from './file-acl.service';
import { UserService } from '../../user/services/user.service';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { ExpenseService } from '../../expense/services/expense.service';
import { CompanyService } from '../../company/services/company.service';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { DOCS_TYPES } from '../../shared/constants';
import { Company } from '../../company/entities/company.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { User } from '../../user/entities/user.entity';
import { Expense } from '../../expense/entities/expense.entity';
import { join } from 'path';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { Invoice } from '../../invoice/entities/invoice.entity';

@Injectable()
export class FileService {
  basePath: string;
  constructor(
    private configService: ConfigService,
    private repository: FileRepository,
    private aclService: FileAclService,
    private userService: UserService,
    private vehicleService: VehicleService,
    private expenseService: ExpenseService,
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FileService.name);
    this.basePath = this.configService.get<string>('FILE_UPLOAD_DESTINATION');
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
    const maxSize = this.configService.get<number>('FILE_MAX_SIZE');
    let fileName = '';

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
        errorMessages.push(`Expense with ID '${input.invoiceId}'  Not Found`);
      }
    }

    if (fileUploaded) {
      file.size = fileUploaded.size;
      file.extension = path.extname(fileUploaded.originalname);

      if (Number(file.size) > maxSize) {
        errorMessages.push(
          `File max size is ${maxSize.toString().slice(0, 1)}M`,
        );
      }

      if (!DOCS_TYPES.includes(file.extension)) {
        errorMessages.push(`Only [${DOCS_TYPES}] are allowed !`);
      }
      fileName = `${new Date().getTime()}.${ctx.user.id}.${file.extension}`;
    }
    if (errorMessages.length != 0) {
      throw new BadRequestException(errorMessages);
    }

    this.logger.log(ctx, `calling ${FileRepository.name}.save`);
    file.link = fileUploaded
      ? await creteUploadFile(basePathWithYear, fileName, fileUploaded.buffer)
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

  async downloadFileById(ctx: RequestContext, id: number): Promise<Buffer> {
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
    const fileToStream = file.link
      ? await readUploadFile(join(process.cwd(), file.link))
      : null;
    if (!fileToStream) {
      throw new NotFoundException();
    }
    return fileToStream;
  }

  async updateFile(
    ctx: RequestContext,
    fileId: number,
    input: FileUpdateDto,
    fileUploaded: Express.Multer.File,
  ): Promise<FileOutputDto> {
    this.logger.log(ctx, `${this.updateFile.name} was called`);

    this.logger.log(ctx, `calling ${FileRepository.name}.getById`);
    const file = await this.repository.getById(fileId);

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
    const maxSize = this.configService.get<number>('FILE_MAX_SIZE');
    let fileName = '';

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
        errorMessages.push(`Expense with ID '${input.invoiceId}'  Not Found`);
      }
    }

    if (fileUploaded) {
      file.size = fileUploaded.size;
      file.extension = path.extname(fileUploaded.originalname);

      if (Number(file.size) > maxSize) {
        errorMessages.push(
          `File max size is ${maxSize.toString().slice(0, 1)}M`,
        );
      }

      if (!DOCS_TYPES.includes(file.extension)) {
        errorMessages.push(`Only [${DOCS_TYPES}] are allowed !`);
      }
      fileName = `${new Date().getTime()}.${ctx.user.id}.${file.extension}`;
    }
    if (errorMessages.length != 0) {
      throw new BadRequestException(errorMessages);
    }

    this.logger.log(ctx, `calling ${FileRepository.name}.save`);
    if (fileUploaded) {
      await removeUploadFile(file.link);
      file.link = await creteUploadFile(
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
      await removeUploadFile(file.link);
    } catch (err) {
      throw new NotAcceptableException(
        'Cannot delete a parent : a forein key constraint',
      );
    }
  }
}
