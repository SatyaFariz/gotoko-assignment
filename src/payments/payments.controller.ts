import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { FindPaymentsQueryParamsDto } from './dto/find-payments-query-params.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import AuthGuard from '../guards/auth-guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  find(@Query() query: FindPaymentsQueryParamsDto) {
    return this.paymentsService.find(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.remove(id);
  }
}
