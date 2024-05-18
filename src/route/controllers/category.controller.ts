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
import {RouteCreateDto} from "../dtos/route-create.dto";
import {RouteOrderDto} from "../dtos/route-order.dto";
import {RouteOutputDto} from "../dtos/route-output.dto";
import {RouteParamDto} from "../dtos/route-param.dto";
import {RouteUpdateDto} from "../dtos/route-update.dto";
import {RouteService} from "../services/route.service";

@SkipThrottle()
@ApiTags('Routes')
@Controller('routes')
export class RouteController {

  constructor(
    private readonly routeService: RouteService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(RouteController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create route API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(RouteOutputDto),
  })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async createRoute(
    @ReqContext() ctx: RequestContext,
    @Body() input: RouteCreateDto,
  ): Promise<BaseApiResponse<RouteOutputDto>> {
    this.logger.log(ctx, `${this.createRoute.name} was called`);
    const route = await this.routeService.createRoute(ctx, input);
    return { data: route, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get route by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(RouteOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getRoute(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<RouteOutputDto>> {
    this.logger.log(ctx, `${this.getRoute.name} was called`);

    const route = await this.routeService.getRouteById(ctx, id);
    return { data: route, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update route API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(RouteOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateRoute(
    @ReqContext() ctx: RequestContext,
    @Param('id') routeId: number,
    @Body() input: RouteUpdateDto,
  ): Promise<BaseApiResponse<RouteOutputDto>> {
    const route = await this.routeService.updateRoute(
      ctx,
      routeId,
      input,
    );
    return { data: route, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete route by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteRoute(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteRoute.name} was called`);

    return this.routeService.deleteRoute(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get routes as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([RouteOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getRoutes(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : RouteParamDto,
    @Query() orderQuery : RouteOrderDto
  ): Promise<BaseApiResponse<RouteOutputDto[]>> {
    this.logger.log(ctx, `${this.getRoutes.name} was called`);

    const { routes, count } = await this.routeService.getRoutes(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: routes, meta: { count } };
  }
}
