import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  HttpStatus, Param, Post, Put,
  Query,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse } from "../../shared/dtos/base-api-response.dto";
import { PaginationParamsDto } from "../../shared/dtos/pagination-params.dto";
import { AppLogger } from "../../shared/logger/logger.service";
import { ReqContext } from "../../shared/request-context/req-context.decorator";
import { RequestContext } from "../../shared/request-context/request-context.dto";
import { CategoryOutputDto } from "../dtos/category-output.dto";
import { CategoryService } from "../services/category.service";
import { CategoryCreateDto } from "../dtos/category-create.dto";
import { CategoryParamDto } from "../dtos/category-param.dto";
import { CategoryOrderDto } from "../dtos/category-order.dto";
import { CategoryUpdateDto } from "../dtos/category-update.dto";

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CategoryController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create category API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(CategoryOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @ReqContext() ctx: RequestContext,
    @Body() input: CategoryCreateDto,
  ): Promise<BaseApiResponse<CategoryOutputDto>> {
    const category = await this.categoryService.createCategory(ctx, input);
    return { data: category, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get category by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CategoryOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getCategory(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<CategoryOutputDto>> {
    this.logger.log(ctx, `${this.getCategory.name} was called`);

    const category = await this.categoryService.getCategoryById(ctx, id);
    return { data: category, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update category API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CategoryOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @ReqContext() ctx: RequestContext,
    @Param('id') categoryId: number,
    @Body() input: CategoryUpdateDto,
  ): Promise<BaseApiResponse<CategoryOutputDto>> {
    const category = await this.categoryService.updateCategory(
      ctx,
      categoryId,
      input,
    );
    return { data: category, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete category by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteCategory(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteCategory.name} was called`);

    return this.categoryService.deleteCategory(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get categories as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CategoryOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCategories(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : CategoryParamDto,
    @Query() orderQuery : CategoryOrderDto
  ): Promise<BaseApiResponse<CategoryOutputDto[]>> {
    this.logger.log(ctx, `${this.getCategories.name} was called`);

    const { categories, count } = await this.categoryService.getCategories(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: categories, meta: { count } };
  }
}
