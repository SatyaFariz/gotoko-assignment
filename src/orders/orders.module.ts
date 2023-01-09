import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity'
import { Order } from './entities/order.entity'
import { Cashier } from '../cashiers/entities/cashier.entity'
import { OrderItem } from './entities/orderitem.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, OrderItem, Cashier])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
