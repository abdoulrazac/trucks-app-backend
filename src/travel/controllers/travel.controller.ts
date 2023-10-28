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
import { TravelOutputDto } from "../dtos/travel-output.dto";
import { TravelService } from "../services/travel.service";
import { TravelCreateDto } from "../dtos/travel-create.dto";
import { TravelParamDto } from "../dtos/travel-param.dto";
import { TravelOrderDto } from "../dtos/travel-order.dto";
import { TravelUpdateDto } from "../dtos/travel-update.dto";

@ApiTags('Travels')
@Controller('travels')
export class TravelController {

  constructor(
    private readonly travelService: TravelService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TravelController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create travel API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(TravelOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createTravel(
    @ReqContext() ctx: RequestContext,
    @Body() input: TravelCreateDto,
  ): Promise<BaseApiResponse<TravelOutputDto>> {
    const travel = await this.travelService.createTravel(ctx, input);
    return { data: travel, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get travel by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TravelOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getTravel(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<TravelOutputDto>> {
    this.logger.log(ctx, `${this.getTravel.name} was called`);

    const travel = await this.travelService.getTravelById(ctx, id);
    return { data: travel, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update travel API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(TravelOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateTravel(
    @ReqContext() ctx: RequestContext,
    @Param('id') travelId: number,
    @Body() input: TravelUpdateDto,
  ): Promise<BaseApiResponse<TravelOutputDto>> {
    const travel = await this.travelService.updateTravel(
      ctx,
      travelId,
      input,
    );
    return { data: travel, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete travel by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteTravel(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteTravel.name} was called`);

    return this.travelService.deleteTravel(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get travels as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([TravelOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getTravels(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : TravelParamDto,
    @Query() orderQuery : TravelOrderDto
  ): Promise<BaseApiResponse<TravelOutputDto[]>> {
    this.logger.log(ctx, `${this.getTravels.name} was called`);

    const { travels, count } = await this.travelService.getTravels(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: travels, meta: { count } };
  }
}
