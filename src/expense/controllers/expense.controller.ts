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
import { SkipThrottle } from "@nestjs/throttler";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse } from "../../shared/dtos/base-api-response.dto";
import { PaginationParamsDto } from "../../shared/dtos/pagination-params.dto";
import { AppLogger } from "../../shared/logger/logger.service";
import { ReqContext } from "../../shared/request-context/req-context.decorator";
import { RequestContext } from "../../shared/request-context/request-context.dto";
import { ExpenseCreateDto } from "../dtos/expense-create.dto";
import { ExpenseOrderDto } from "../dtos/expense-order.dto";
import { ExpenseOutputDto } from "../dtos/expense-output.dto";
import { ExpenseParamDto } from "../dtos/expense-param.dto";
import { ExpenseUpdateDto } from "../dtos/expense-update.dto";
import { ExpenseService } from "../services/expense.service";

@SkipThrottle()
@ApiTags('Expenses')
@Controller('expenses')
export class ExpenseController {

  constructor(
    private readonly expenseService: ExpenseService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ExpenseController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create expense API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(ExpenseOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createExpense(
    @ReqContext() ctx: RequestContext,
    @Body() input: ExpenseCreateDto,
  ): Promise<BaseApiResponse<ExpenseOutputDto>> {
    const expense = await this.expenseService.createExpense(ctx, input);
    return { data: expense, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get expense by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(ExpenseOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getExpense(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<ExpenseOutputDto>> {
    this.logger.log(ctx, `${this.getExpense.name} was called`);

    const expense = await this.expenseService.getExpenseById(ctx, id);
    return { data: expense, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update expense API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(ExpenseOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateExpense(
    @ReqContext() ctx: RequestContext,
    @Param('id') expenseId: number,
    @Body() input: ExpenseUpdateDto,
  ): Promise<BaseApiResponse<ExpenseOutputDto>> {
    const expense = await this.expenseService.updateExpense(
      ctx,
      expenseId,
      input,
    );
    return { data: expense, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete expense by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteExpense(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteExpense.name} was called`);

    return this.expenseService.deleteExpense(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get expenses as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([ExpenseOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getExpenses(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : ExpenseParamDto,
    @Query() orderQuery : ExpenseOrderDto
  ): Promise<BaseApiResponse<ExpenseOutputDto[]>> {
    this.logger.log(ctx, `${this.getExpenses.name} was called`);

    const { expenses, count } = await this.expenseService.getExpenses(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: expenses, meta: { count } };
  }
}
