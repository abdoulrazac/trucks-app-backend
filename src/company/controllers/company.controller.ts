import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  HttpStatus, Param, Post, Put,
  Query,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SkipThrottle } from "@nestjs/throttler";

import { Roles } from '../../auth/decorators/role.decorator'; 
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ROLE } from '../../shared/constants';
import { BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse } from "../../shared/dtos/base-api-response.dto";
import { BufferOutputDto } from '../../shared/dtos/buffer-output.dto';
import { PaginationParamsDto } from "../../shared/dtos/pagination-params.dto";
import { AppLogger } from "../../shared/logger/logger.service";
import { ReqContext } from "../../shared/request-context/req-context.decorator";
import { RequestContext } from "../../shared/request-context/request-context.dto";
import { CompanyCreateDto } from "../dtos/company-create.dto";
import { CompanyOrderDto } from "../dtos/company-order.dto";
import { CompanyOutputDto } from "../dtos/company-output.dto";
import { CompanyParamDto } from "../dtos/company-param.dto";
import { CompanyStatsOutputDto } from "../dtos/company-stats-output.dto";
import { CompanyUpdateDto } from "../dtos/company-update.dto";
import { CompanyService } from "../services/company.service";

@SkipThrottle()
@ApiTags('Companies')
@Controller('companies')
export class CompanyController {

  constructor(
    private readonly companyService: CompanyService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CompanyController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create company API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(CompanyOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createCompany(
    @ReqContext() ctx: RequestContext,
    @Body() input: CompanyCreateDto,
    @UploadedFile() fileUploaded: Express.Multer.File,
  ): Promise<BaseApiResponse<CompanyOutputDto>> {
    this.logger.log(ctx, `${this.createCompany.name} was called`);
    const company = await this.companyService.createCompany(ctx, input, fileUploaded);
    return { data: company, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get company by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CompanyOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getCompany(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<CompanyOutputDto>> {
    this.logger.log(ctx, `${this.getCompany.name} was called`);

    const company = await this.companyService.getCompanyById(ctx, id);
    return { data: company, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update company API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CompanyOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateCompany(
    @ReqContext() ctx: RequestContext,
    @Param('id') companyId: number,
    @Body() input: CompanyUpdateDto,
    @UploadedFile() fileUploaded: Express.Multer.File,
  ): Promise<BaseApiResponse<CompanyOutputDto>> {
    const company = await this.companyService.updateCompany(
      ctx,
      companyId,
      input,
      fileUploaded
    );
    return { data: company, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete company by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteCompany(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteCompany.name} was called`);

    return this.companyService.deleteCompany(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get companies as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CompanyOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCompanies(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : CompanyParamDto,
    @Query() orderQuery : CompanyOrderDto
  ): Promise<BaseApiResponse<CompanyOutputDto[]>> {
    this.logger.log(ctx, `${this.getCompanies.name} was called`);

    const { companies, count } = await this.companyService.getCompanies(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: companies, meta: { count } };
  }


  @Get('/read/:id/avatar')
  @ApiOperation({
    summary: 'Get company avatar by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(BufferOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.MANAGER, ROLE.ACCOUNTANT)
  async getAvatar(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
    @Response() res ,
  ) {
    this.logger.log(ctx, `${this.getAvatar.name} was called`);

    const filePath = await this.companyService.downloadAvatarByUserId(ctx, id);
    return res.sendFile(filePath);
  }

  @Get('/read/:id/statistics')
  @ApiOperation({
    summary: 'Get company statistics API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CompanyOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getStatistics(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<CompanyStatsOutputDto>> {
    this.logger.log(ctx, `${this.getStatistics.name} was called`);

    const stats = await this.companyService.getStatisticsById(ctx, id);
    return { data: stats, meta: {} };
  }
}
