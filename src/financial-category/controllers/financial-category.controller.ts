import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { SkipThrottle } from "@nestjs/throttler";

import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse} from "../../shared/dtos/base-api-response.dto";
import {PaginationParamsDto} from "../../shared/dtos/pagination-params.dto";
import {AppLogger} from "../../shared/logger/logger.service";
import {ReqContext} from "../../shared/request-context/req-context.decorator";
import {RequestContext} from "../../shared/request-context/request-context.dto";
import {FinancialCategoryCreateDto} from "../dtos/financial-category-create.dto";
import {FinancialCategoryOrderDto} from "../dtos/financial-category-order.dto";
import {FinancialCategoryOutputDto} from "../dtos/financial-category-output.dto";
import {FinancialCategoryParamDto} from "../dtos/financial-category-param.dto";
import {FinancialCategoryUpdateDto} from "../dtos/financial-category-update.dto";
import {FinancialCategoryService} from "../services/financial-category.service";

@SkipThrottle()
@ApiTags('Finance categories')
@Controller('finance-categories')
export class FinancialCategoryController {

  constructor(
    private readonly financialCategoryService: FinancialCategoryService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FinancialCategoryController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create financialCategory API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(FinancialCategoryOutputDto),
  })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async createFinancialCategory(
    @ReqContext() ctx: RequestContext,
    @Body() input: FinancialCategoryCreateDto,
  ): Promise<BaseApiResponse<FinancialCategoryOutputDto>> {
    const financialCategory = await this.financialCategoryService.createFinancialCategory(ctx, input);
    return { data: financialCategory, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get financialCategory by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(FinancialCategoryOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getFinancialCategory(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<FinancialCategoryOutputDto>> {
    this.logger.log(ctx, `${this.getFinancialCategory.name} was called`);

    const financialCategory = await this.financialCategoryService.getFinancialCategoryById(ctx, id);
    return { data: financialCategory, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update financialCategory API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(FinancialCategoryOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateFinancialCategory(
    @ReqContext() ctx: RequestContext,
    @Param('id') financialCategoryId: number,
    @Body() input: FinancialCategoryUpdateDto,
  ): Promise<BaseApiResponse<FinancialCategoryOutputDto>> {
    const financialCategory = await this.financialCategoryService.updateFinancialCategory(
      ctx,
      financialCategoryId,
      input,
    );
    return { data: financialCategory, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete financialCategory by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteFinancialCategory(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteFinancialCategory.name} was called`);

    return this.financialCategoryService.deleteFinancialCategory(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get categories as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([FinancialCategoryOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCategories(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : FinancialCategoryParamDto,
    @Query() orderQuery : FinancialCategoryOrderDto
  ): Promise<BaseApiResponse<FinancialCategoryOutputDto[]>> {
    this.logger.log(ctx, `${this.getCategories.name} was called`);

    const { categories, count } = await this.financialCategoryService.getFinancialCategories(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: categories, meta: { count } };
  }
}
