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
import { ContractOutputDto } from "../dtos/contract-output.dto";
import { ContractService } from "../services/contract.service";
import { ContractCreateDto } from "../dtos/contract-create.dto";
import { ContractParamDto } from "../dtos/contract-param.dto";
import { ContractOrderDto } from "../dtos/contract-order.dto";
import { ContractUpdateDto } from "../dtos/contract-update.dto";

@ApiTags('Contracts')
@Controller('contracts')
export class ContractController {

  constructor(
    private readonly contractService: ContractService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ContractController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create contract API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(ContractOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createContract(
    @ReqContext() ctx: RequestContext,
    @Body() input: ContractCreateDto,
  ): Promise<BaseApiResponse<ContractOutputDto>> {
    const contract = await this.contractService.createContract(ctx, input);
    return { data: contract, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get contract by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(ContractOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getContract(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<ContractOutputDto>> {
    this.logger.log(ctx, `${this.getContract.name} was called`);

    const contract = await this.contractService.getContractById(ctx, id);
    return { data: contract, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update contract API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(ContractOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateContract(
    @ReqContext() ctx: RequestContext,
    @Param('id') contractId: number,
    @Body() input: ContractUpdateDto,
  ): Promise<BaseApiResponse<ContractOutputDto>> {
    const contract = await this.contractService.updateContract(
      ctx,
      contractId,
      input,
    );
    return { data: contract, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete contract by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteContract(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteContract.name} was called`);

    return this.contractService.deleteContract(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get contracts as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([ContractOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getContracts(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : ContractParamDto,
    @Query() orderQuery : ContractOrderDto
  ): Promise<BaseApiResponse<ContractOutputDto[]>> {
    this.logger.log(ctx, `${this.getContracts.name} was called`);

    const { contracts, count } = await this.contractService.getContracts(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: contracts, meta: { count } };
  }
}
