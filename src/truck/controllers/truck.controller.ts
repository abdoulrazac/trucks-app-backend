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
import { TruckOutputDto } from "../dtos/truck-output.dto";
import { TruckService } from "../services/truck.service";
import { TruckCreateDto } from "../dtos/truck-create.dto";
import { TruckParamDto } from "../dtos/truck-param.dto";
import { TruckOrderDto } from "../dtos/truck-order.dto";
import { TruckUpdateDto } from "../dtos/truck-update.dto";

@ApiTags('Trucks')
@Controller('trucks')
export class TruckController {

  constructor(
    private readonly truckService: TruckService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TruckController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create truck API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(TruckOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createTruck(
    @ReqContext() ctx: RequestContext,
    @Body() input: TruckCreateDto,
  ): Promise<BaseApiResponse<TruckOutputDto>> {
    const truck = await this.truckService.createTruck(ctx, input);
    return { data: truck, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get truck by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TruckOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getTruck(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<TruckOutputDto>> {
    this.logger.log(ctx, `${this.getTruck.name} was called`);

    const truck = await this.truckService.getTruckById(ctx, id);
    return { data: truck, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update truck API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TruckOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateTruck(
    @ReqContext() ctx: RequestContext,
    @Param('id') truckId: number,
    @Body() input: TruckUpdateDto,
  ): Promise<BaseApiResponse<TruckOutputDto>> {
    const truck = await this.truckService.updateTruck(
      ctx,
      truckId,
      input,
    );
    return { data: truck, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete truck by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteTruck(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteTruck.name} was called`);

    return this.truckService.deleteTruck(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get trucks as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([TruckOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getTrucks(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : TruckParamDto,
    @Query() orderQuery : TruckOrderDto
  ): Promise<BaseApiResponse<TruckOutputDto[]>> {
    this.logger.log(ctx, `${this.getTrucks.name} was called`);

    const { trucks, count } = await this.truckService.getTrucks(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: trucks, meta: { count } };
  }
}
