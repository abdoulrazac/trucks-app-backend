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
import {CheckPointCreateDto} from "../dtos/check-point-create.dto";
import {CheckPointOrderDto} from "../dtos/check-point-order.dto";
import {CheckPointOutputDto} from "../dtos/check-point-output.dto";
import {CheckPointParamDto} from "../dtos/check-point-param.dto";
import {CheckPointUpdateDto} from "../dtos/check-point-update.dto";
import {CheckPointService} from "../services/check-point.service";

@SkipThrottle()
@ApiTags('CheckPoints')
@Controller('check-points')
export class CheckPointController {

  constructor(
    private readonly checkPointService: CheckPointService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(CheckPointController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create checkPoint API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(CheckPointOutputDto),
  })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async createCheckPoint(
    @ReqContext() ctx: RequestContext,
    @Body() input: CheckPointCreateDto,
  ): Promise<BaseApiResponse<CheckPointOutputDto>> {
    const checkPoint = await this.checkPointService.createCheckPoint(ctx, input);
    return { data: checkPoint, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get checkPoint by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CheckPointOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getCheckPoint(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<CheckPointOutputDto>> {
    this.logger.log(ctx, `${this.getCheckPoint.name} was called`);

    const checkPoint = await this.checkPointService.getCheckPointById(ctx, id);
    return { data: checkPoint, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update checkPoint API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CheckPointOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateCheckPoint(
    @ReqContext() ctx: RequestContext,
    @Param('id') checkPointId: number,
    @Body() input: CheckPointUpdateDto,
  ): Promise<BaseApiResponse<CheckPointOutputDto>> {
    const checkPoint = await this.checkPointService.updateCheckPoint(
      ctx,
      checkPointId,
      input,
    );
    return { data: checkPoint, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete checkPoint by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteCheckPoint(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteCheckPoint.name} was called`);

    return this.checkPointService.deleteCheckPoint(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get checkPoints as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CheckPointOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCheckPoints(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : CheckPointParamDto,
    @Query() orderQuery : CheckPointOrderDto
  ): Promise<BaseApiResponse<CheckPointOutputDto[]>> {
    this.logger.log(ctx, `${this.getCheckPoints.name} was called`);

    const { checkPoints, count } = await this.checkPointService.getCheckPoints(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: checkPoints, meta: { count } };
  }
}
