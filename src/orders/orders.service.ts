import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import generateCreateEmptyBodyErrorObject from '../helpers/generateCreateEmptyBodyErrorObject'
import { HttpException } from '../classes'

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    if(Object.keys(createOrderDto).length === 0) {
      const error = generateCreateEmptyBodyErrorObject(['paymentId', 'totalPaid', 'products'])
      throw new HttpException(error, 400)
    }
  }

  find() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
