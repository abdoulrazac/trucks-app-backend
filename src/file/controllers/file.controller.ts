import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  HttpStatus, Param, Post, Put,
  Query, UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse } from "../../shared/dtos/base-api-response.dto";
import { PaginationParamsDto } from "../../shared/dtos/pagination-params.dto";
import { AppLogger } from "../../shared/logger/logger.service";
import { ReqContext } from "../../shared/request-context/req-context.decorator";
import { RequestContext } from "../../shared/request-context/request-context.dto";
import { FileCreateDto } from "../dtos/file-create.dto";
import { FileOrderDto } from "../dtos/file-order.dto";
import { FileOutputDto } from "../dtos/file-output.dto";
import { FileParamDto } from "../dtos/file-param.dto";
import { FileUpdateDto } from "../dtos/file-update.dto";
import { FileService } from "../services/file.service";

@ApiTags('Files')
@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FileController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create file API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(FileOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createFile(
    @ReqContext() ctx: RequestContext,
    @Body() input: FileCreateDto,
    @UploadedFile() fileUploaded : Express.Multer.File
  ): Promise<BaseApiResponse<FileOutputDto>> {
    const file = await this.fileService.createFile(ctx, input, fileUploaded);
    return { data: file, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get file by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(FileOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getFile(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<FileOutputDto>> {
    this.logger.log(ctx, `${this.getFile.name} was called`);

    const file = await this.fileService.getFileById(ctx, id);
    return { data: file, meta: {} };
  }

  @Get('/read/:id/download')
  @ApiOperation({
    summary: 'Download file by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Buffer,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async downloadFile(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<Buffer>> {
    this.logger.log(ctx, `${this.getFile.name} was called`);

    const file = await this.fileService.downloadFileById(ctx, id);
    return { data: file, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update file API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(FileOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateFile(
    @ReqContext() ctx: RequestContext,
    @Param('id') fileId: number,
    @Body() input: FileUpdateDto,
    @UploadedFile() fileUploaded : Express.Multer.File
  ): Promise<BaseApiResponse<FileOutputDto>> {
    const file = await this.fileService.updateFile(
      ctx,
      fileId,
      input,
      fileUploaded
    );
    return { data: file, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete file by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteFile(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteFile.name} was called`);

    return this.fileService.deleteFile(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get files as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([FileOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getFiles(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : FileParamDto,
    @Query() orderQuery : FileOrderDto
  ): Promise<BaseApiResponse<FileOutputDto[]>> {
    this.logger.log(ctx, `${this.getFiles.name} was called`);

    const { files, count } = await this.fileService.getFiles(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: files, meta: { count } };
  }
}
