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
import { Roles } from "src/auth/decorators/role.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ROLE } from "src/shared/constants";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse } from "../../shared/dtos/base-api-response.dto";
import { PaginationParamsDto } from "../../shared/dtos/pagination-params.dto";
import { AppLogger } from "../../shared/logger/logger.service";
import { ReqContext } from "../../shared/request-context/req-context.decorator";
import { RequestContext } from "../../shared/request-context/request-context.dto";
import { FinanceCreateDto } from "../dtos/finance-create.dto";
import { FinanceOrderDto } from "../dtos/finance-order.dto";
import { FinanceOutputDto } from "../dtos/finance-output.dto";
import { FinanceParamDto } from "../dtos/finance-param.dto";
import { FinanceStatsOutputDto } from "../dtos/finance-stats-output.dto";
import { FinanceUpdateDto } from "../dtos/finance-update.dto";
import { FinanceService } from "../services/finance.service";

@SkipThrottle()
@ApiTags('Finances')
@Controller('finances')
export class FinanceController {

  constructor(
    private readonly financeService: FinanceService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FinanceController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create finance API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(FinanceOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createFinance(
    @ReqContext() ctx: RequestContext,
    @Body() input: FinanceCreateDto,
  ): Promise<BaseApiResponse<FinanceOutputDto>> {
    const finance = await this.financeService.createFinance(ctx, input);
    return { data: finance, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get finance by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(FinanceOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getFinance(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<FinanceOutputDto>> {
    this.logger.log(ctx, `${this.getFinance.name} was called`);

    const finance = await this.financeService.getFinanceById(ctx, id);
    return { data: finance, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update finance API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(FinanceOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateFinance(
    @ReqContext() ctx: RequestContext,
    @Param('id') financeId: number,
    @Body() input: FinanceUpdateDto,
  ): Promise<BaseApiResponse<FinanceOutputDto>> {
    const finance = await this.financeService.updateFinance(
      ctx,
      financeId,
      input,
    );
    return { data: finance, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete finance by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteFinance(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteFinance.name} was called`);

    return this.financeService.deleteFinance(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get finances as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([FinanceOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getFinances(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : FinanceParamDto,
    @Query() orderQuery : FinanceOrderDto
  ): Promise<BaseApiResponse<FinanceOutputDto[]>> {
    this.logger.log(ctx, `${this.getFinances.name} was called`);

    const { finances, count } = await this.financeService.getFinances(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: finances, meta: { count } };
  }

  
  @Get('/statistics')
  @ApiOperation({
    summary: 'Get finance statistics API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(FinanceOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.MANAGER, ROLE.ACCOUNTANT)
  async getStatistics(
    @ReqContext() ctx: RequestContext,
  ): Promise<BaseApiResponse<FinanceStatsOutputDto>> {
    this.logger.log(ctx, `${this.getStatistics.name} was called`);

    const stats = await this.financeService.getStatistics(ctx);
    return { data: stats, meta: {} };
  }
}
