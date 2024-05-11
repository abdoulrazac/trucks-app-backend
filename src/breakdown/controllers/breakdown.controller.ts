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
import { BreakdownCreateDto } from "../dtos/breakdown-create.dto";
import { BreakdownOrderDto } from "../dtos/breakdown-order.dto";
import { BreakdownOutputDto } from "../dtos/breakdown-output.dto";
import { BreakdownParamDto } from "../dtos/breakdown-param.dto";
import { BreakdownUpdateDto } from "../dtos/breakdown-update.dto";
import { BreakdownService } from "../services/breakdown.service";

@SkipThrottle()
@ApiTags('Breakdowns')
@Controller('breakdowns')
export class BreakdownController {

  constructor(
    private readonly breakdownService: BreakdownService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(BreakdownController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create breakdownAPI',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(BreakdownOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createBreakdown(
    @ReqContext() ctx: RequestContext,
    @Body() input: BreakdownCreateDto,
  ): Promise<BaseApiResponse<BreakdownOutputDto>> {
    const breakdown= await this.breakdownService.createBreakdown(ctx, input);
    return { data: breakdown, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get breakdownby id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(BreakdownOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getBreakdown(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<BreakdownOutputDto>> {
    this.logger.log(ctx, `${this.getBreakdown.name} was called`);

    const breakdown= await this.breakdownService.getBreakdownById(ctx, id);
    return { data: breakdown, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update breakdownAPI',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(BreakdownOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateBreakdown(
    @ReqContext() ctx: RequestContext,
    @Param('id') breakdownId: number,
    @Body() input: BreakdownUpdateDto,
  ): Promise<BaseApiResponse<BreakdownOutputDto>> {
    const breakdown= await this.breakdownService.updateBreakdown(
      ctx,
      breakdownId,
      input,
    );
    return { data: breakdown, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete breakdownby id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteBreakdown(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteBreakdown.name} was called`);

    return this.breakdownService.deleteBreakdown(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get breakdowns as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([BreakdownOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getBreakdowns(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : BreakdownParamDto,
    @Query() orderQuery : BreakdownOrderDto
  ): Promise<BaseApiResponse<BreakdownOutputDto[]>> {
    this.logger.log(ctx, `${this.getBreakdowns.name} was called`);

    const { breakdowns, count } = await this.breakdownService.getBreakdowns(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: breakdowns, meta: { count } };
  }
}
