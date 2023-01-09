import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, ParseArrayPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQueryParamsDto } from './dto/find-orders-query-params.dto'
import { GetSubtotalDto } from './dto/get-subtotal.dto'
import generateInvalidFieldsErrorObject from '../helpers/generateInvalidFieldsErrorObject'
import { HttpException } from '../classes';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }
}
