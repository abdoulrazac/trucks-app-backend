import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

import {Roles} from '../../auth/decorators/role.decorator';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import {RolesGuard} from '../../auth/guards/roles.guard';
import {ROLE} from '../../shared/constants';
import {BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse,} from '../../shared/dtos/base-api-response.dto';
import {BufferOutputDto} from '../../shared/dtos/buffer-output.dto';
import {PaginationParamsDto} from '../../shared/dtos/pagination-params.dto';
import {AppLogger} from '../../shared/logger/logger.service';
import {ReqContext} from '../../shared/request-context/req-context.decorator';
import {RequestContext} from '../../shared/request-context/request-context.dto';
import {UserCreateDto} from '../dtos/user-create.dto';
import {UserOrderDto} from '../dtos/user-order.dto';
import {UserOutputDto} from '../dtos/user-output.dto';
import {UserParamDto} from '../dtos/user-param.dto';
import { UserStatsOutputDto } from '../dtos/user-stats-output.dto';
import {UserUpdateDto} from '../dtos/user-update-input.dto';
import {UserService} from '../services/user.service';

@SkipThrottle()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserController.name);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  @ApiOperation({
    summary: 'Get user me API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(UserOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  async getMe(
    @ReqContext() ctx: RequestContext,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    this.logger.log(ctx, `${this.getMe.name} was called`);

    const user = await this.userService.findById(ctx, ctx.user.id);
    return { data: user, meta: {} };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/list')
  @ApiOperation({
    summary: 'Get users as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([UserOutputDto]),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.MANAGER, ROLE.ACCOUNTANT)
  async getUsers(
    @ReqContext() ctx: RequestContext,
    @Query() filterQuery: UserParamDto,
    @Query() query: PaginationParamsDto,
    @Query() orderQuery: UserOrderDto,
  ): Promise<BaseApiResponse<UserOutputDto[]>> {
    this.logger.log(ctx, `${this.getUsers.name} was called`); 

    const { users, count } = await this.userService.getUsers(
      ctx,
      filterQuery,
      orderQuery,
      query.limit,
      query.offset,
    );

    return { data: users, meta: { count } };
  }

  // TODO: ADD RoleGuard
  // NOTE : This can be made a admin only endpoint. For normal users they can use GET /me
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get user by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(UserOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(ROLE.ADMIN, ROLE.MANAGER, ROLE.ACCOUNTANT)
  async getUser(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    this.logger.log(ctx, `${this.getUser.name} was called`);

    const user = await this.userService.getUserById(ctx, id);
    return { data: user, meta: {} };
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create user API' })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(UserOutputDto),
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.MANAGER)
  async createUser(
    @ReqContext() ctx: RequestContext,
    @Body() input: UserCreateDto,
    @UploadedFile() fileUploaded: Express.Multer.File,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    this.logger.log(ctx, `${this.createUser.name} was called`);

    const user = await this.userService.createUser(ctx, input, fileUploaded);
    return { data: user, meta: {} };
  }

  // TODO: ADD RoleGuard
  // NOTE : This can be made a admin only endpoint. For normal users they can use PATCH /me
  @Put('/update/:id')
  @ApiOperation({ summary: 'Update user API' })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(UserOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number,
    @Body() input: UserUpdateDto,
    @UploadedFile() fileUploaded: Express.Multer.File,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    this.logger.log(ctx, `${this.updateUser.name} was called`);
    const user = await this.userService.updateUser(
      ctx,
      userId,
      input,
      fileUploaded,
    );
    return { data: user, meta: {} };
  }

  @Get('/read/:id/avatar')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Get user avatar by id API' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(BufferOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAvatar(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
    @Response() res ,
  ) {
    this.logger.log(ctx, `${this.getUser.name} was called`);

    const filePath = await this.userService.downloadAvatarByUserId(ctx, id);
    return res.sendFile(filePath);
  }

  

  @Get('/read/:id/statistics')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Get user statistics by id API' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(BufferOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getStatistics(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ) : Promise<BaseApiResponse<UserStatsOutputDto>> {
    this.logger.log(ctx, `${this.getUser.name} was called`);

    const stats = await this.userService.getStatisticsById(ctx, id);
    return { data: stats, meta: {} };
  }
}
