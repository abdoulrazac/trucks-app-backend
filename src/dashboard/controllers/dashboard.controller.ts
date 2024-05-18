import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { SkipThrottle } from "@nestjs/throttler";
import { Roles } from "src/auth/decorators/role.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ROLE } from "src/shared/constants";

import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse} from "../../shared/dtos/base-api-response.dto";
import {AppLogger} from "../../shared/logger/logger.service";
import {ReqContext} from "../../shared/request-context/req-context.decorator";
import {RequestContext} from "../../shared/request-context/request-context.dto";
import { DashboardStatsOutputDto } from "../dtos/dashboard-stats-output.dto";
import {DashboardService} from "../services/dashboard.service";

@SkipThrottle()
@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(DashboardController.name);
  }


  @Get('/statistics')
  @ApiOperation({
    summary: 'Get dashboard statistics by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(DashboardStatsOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.MANAGER, ROLE.ACCOUNTANT)
  async getDashboardStatistics(
    @ReqContext() ctx: RequestContext,
  ): Promise<BaseApiResponse<DashboardStatsOutputDto>> {
    this.logger.log(ctx, `${this.getDashboardStatistics.name} was called`);

    const stats = await this.dashboardService.getStatistics(ctx);
    return { data: stats, meta: {} };
  }
}
