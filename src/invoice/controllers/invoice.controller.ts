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
import { InvoiceCreateDto } from "../dtos/invoice-create.dto";
import { InvoiceOrderDto } from "../dtos/invoice-order.dto";
import { InvoiceOutputDto } from "../dtos/invoice-output.dto";
import { InvoiceParamDto } from "../dtos/invoice-param.dto";
import { InvoiceUpdateDto } from "../dtos/invoice-update.dto";
import { InvoiceService } from "../services/invoice.service";

@SkipThrottle()
@ApiTags('Invoices')
@Controller('invoices')
export class InvoiceController {

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(InvoiceController.name);
  }


  @Post("/create")
  @ApiOperation({
    summary: 'Create invoice API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(InvoiceOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createInvoice(
    @ReqContext() ctx: RequestContext,
    @Body() input: InvoiceCreateDto,
  ): Promise<BaseApiResponse<InvoiceOutputDto>> {
    const invoice = await this.invoiceService.createInvoice(ctx, input);
    return { data: invoice, meta: {} };
  }


  @Get('/read/:id')
  @ApiOperation({
    summary: 'Get invoice by id API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(InvoiceOutputDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async getInvoice(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<InvoiceOutputDto>> {
    this.logger.log(ctx, `${this.getInvoice.name} was called`);

    const invoice = await this.invoiceService.getInvoiceById(ctx, id);
    return { data: invoice, meta: {} };
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Update invoice API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(InvoiceOutputDto),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateInvoice(
    @ReqContext() ctx: RequestContext,
    @Param('id') invoiceId: number,
    @Body() input: InvoiceUpdateDto,
  ): Promise<BaseApiResponse<InvoiceOutputDto>> {
    const invoice = await this.invoiceService.updateInvoice(
      ctx,
      invoiceId,
      input,
    );
    return { data: invoice, meta: {} };
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete invoice by id API',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  async deleteInvoice(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<void> {
    this.logger.log(ctx, `${this.deleteInvoice.name} was called`);

    return this.invoiceService.deleteInvoice(ctx, id);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Get invoices as a list API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([InvoiceOutputDto]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getInvoices(
    @ReqContext() ctx: RequestContext,
    @Query() paginationQuery: PaginationParamsDto,
    @Query() filterQuery : InvoiceParamDto,
    @Query() orderQuery : InvoiceOrderDto
  ): Promise<BaseApiResponse<InvoiceOutputDto[]>> {
    this.logger.log(ctx, `${this.getInvoices.name} was called`);

    const { invoices, count } = await this.invoiceService.getInvoices(
      ctx,
      filterQuery,
      orderQuery,
      paginationQuery.limit,
      paginationQuery.offset,
    );

    return { data: invoices, meta: { count } };
  }
}
