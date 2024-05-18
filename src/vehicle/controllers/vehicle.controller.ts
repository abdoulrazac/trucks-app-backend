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
import { VehicleCreateDto } from "../dtos/vehicle-create.dto";
import { VehicleOrderDto } from "../dtos/vehicle-order.dto";
import { VehicleOutputDto } from "../dtos/vehicle-output.dto";
import { VehicleParamDto } from "../dtos/vehicle-param.dto";
import { VehicleStatsOutputDto } from "../dtos/vehicle-stats-output.dto";
import { VehicleUpdateDto } from "../dtos/vehicle-update.dto";
import { VehicleService } from "../services/vehicle.service";

@SkipThrottle({})
@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(VehicleController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create vehicle API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(VehicleOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createVehicle(
    @ReqContext() ctx: RequestContext,
    @Body() input: VehicleCreateDto,
  ): Promise<BaseApiResponse<VehicleOutputDto>> {
    const vehicle = await this.vehicleService.createVehicle(ctx, input);
    return { data: vehicle, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get vehicle by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(VehicleOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getVehicle(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<VehicleOutputDto>> {
    this.logger.log(ctx, `${this.getVehicle.name} was called`);

    const vehicle = await this.vehicleService.getVehicleById(ctx, id);
    return { data: vehicle, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update vehicle API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(VehicleOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateVehicle(
    @ReqContext() ctx: RequestContext,
    @Param('id') vehicleId: number,
    @Body() input: VehicleUpdateDto,
  ): Promise<BaseApiResponse<VehicleOutputDto>> {
    const vehicle = await this.vehicleService.updateVehicle(
      ctx,
      vehicleId,
      input,
    );
    return { data: vehicle, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete vehicle by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteVehicle(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteVehicle.name} was called`);

    return this.vehicleService.deleteVehicle(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get vehicles as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([VehicleOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getVehicles(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : VehicleParamDto,
    @Query() orderQuery : VehicleOrderDto
  ): Promise<BaseApiResponse<VehicleOutputDto[]>> {
    this.logger.log(ctx, `${this.getVehicles.name} was called`);

    const { vehicles, count } = await this.vehicleService.getVehicles(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: vehicles, meta: { count } };
  }

  

  @Get('/read/:id/statistics')
  @ApiOperation({
    summary: 'Get vehicle statistics by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(VehicleStatsOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getVehicleStatistics(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<VehicleStatsOutputDto>> {
    this.logger.log(ctx, `${this.getVehicle.name} was called`);

    const stats = await this.vehicleService.getStatisticsById(ctx, id);
    return { data: stats, meta: {} };
  }

}
