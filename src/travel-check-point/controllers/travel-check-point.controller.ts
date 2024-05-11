import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { SkipThrottle } from "@nestjs/throttler";

import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {BaseApiResponse, SwaggerBaseApiResponse} from "../../shared/dtos/base-api-response.dto";
import {PaginationParamsDto} from "../../shared/dtos/pagination-params.dto";
import {AppLogger} from "../../shared/logger/logger.service";
import {ReqContext} from "../../shared/request-context/req-context.decorator";
import {RequestContext} from "../../shared/request-context/request-context.dto";
import {TravelCheckPointCreateDto} from "../dtos/travel-check-point-create.dto";
import {TravelCheckPointOrderDto} from "../dtos/travel-check-point-order.dto";
import {TravelCheckPointOutputDto} from "../dtos/travel-check-point-output.dto";
import {TravelCheckPointParamDto} from "../dtos/travel-check-point-param.dto";
import {TravelCheckPointService} from "../services/travel-check-point.service";

@SkipThrottle()
@ApiTags('TravelCheckPoints')
@Controller('travel-check-points')
export class TravelCheckPointController {

  constructor(
    private readonly travelCheckPointService: TravelCheckPointService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TravelCheckPointController.name);
  }


  @Post("/save")
  @ApiOperation({
    summary: 'Create travelCheckPoint API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(TravelCheckPointOutputDto),
  })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async createTravelCheckPoint(
    @ReqContext() ctx: RequestContext,
    @Body() input: TravelCheckPointCreateDto,
  ): Promise<BaseApiResponse<TravelCheckPointOutputDto>> {
    const travelCheckPoint = await this.travelCheckPointService.saveTravelCheckPoint(ctx, input);
    return { data: travelCheckPoint, meta: {} };
  }

  @Delete('/delete')
  @ApiOperation({
    summary: 'Delete travelCheckPoint by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteTravelCheckPoint(
    @ReqContext() ctx: RequestContext,
    @Body() input: TravelCheckPointCreateDto,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteTravelCheckPoint.name} was called`);

    return this.travelCheckPointService.deleteTravelCheckPoint(ctx, input.travelId, input.checkPointId);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get travelCheckPoints as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([TravelCheckPointOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getTravelCheckPoints(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : TravelCheckPointParamDto,
    @Query() orderQuery : TravelCheckPointOrderDto
  ): Promise<BaseApiResponse<TravelCheckPointOutputDto[]>> {
    this.logger.log(ctx, `${this.getTravelCheckPoints.name} was called`);

    const { travelCheckPoints, count } = await this.travelCheckPointService.getTravelCheckPoints(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: travelCheckPoints, meta: { count } };
  }
}
