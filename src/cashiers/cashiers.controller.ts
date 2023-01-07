import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CashiersService } from './cashiers.service';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { FindCashiersQueryParamsDto } from './dto/find-cashiers-query-params.dto';

@Controller('cashiers')
export class CashiersController {
  constructor(private readonly cashiersService: CashiersService) {}

  @Post()
  create(@Body() createCashierDto: CreateCashierDto) {
    return this.cashiersService.create(createCashierDto);
  }

  @Get()
  find(@Query() query: FindCashiersQueryParamsDto) {
    return this.cashiersService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cashiersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCashierDto: UpdateCashierDto) {
    return this.cashiersService.update(id, updateCashierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cashiersService.remove(id);
  }
}
