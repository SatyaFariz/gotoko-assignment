import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, ParseArrayPipe, Res, UseGuards, Headers } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQueryParamsDto } from './dto/find-orders-query-params.dto'
import { GetSubtotalDto } from './dto/get-subtotal.dto'
import generateInvalidFieldsErrorObject from '../helpers/generateInvalidFieldsErrorObject'
import { HttpException } from '../classes';
import AuthGuard from '../guards/auth-guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Headers() headers: object) {
    return this.ordersService.create(createOrderDto, headers);
  }

  @UseGuards(AuthGuard)
  @Post('subtotal')
  calculateSubtotal(
    @Body(new ParseArrayPipe({ items: GetSubtotalDto, whitelist: true, exceptionFactory: (errors) => {
      const error = generateInvalidFieldsErrorObject(errors)
      throw new HttpException(error, 400)
    }})
  ) subtotalDto: GetSubtotalDto[]) {
    return this.ordersService.calculateSubtotal(subtotalDto);
  }

  @Get()
  find(@Query() query: FindOrdersQueryParamsDto) {
    return this.ordersService.find(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id/download')
  async downloadPDF(@Res() res, @Param('id', ParseIntPipe) id: number) {
    return this.ordersService.downloadPDF(res, id)
  }

  @UseGuards(AuthGuard)
  @Get(':id/check-download')
  checkDownload(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.checkDownload(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }
}
