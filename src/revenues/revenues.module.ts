import { Module } from '@nestjs/common';
import { RevenuesService } from './revenues.service';
import { RevenuesController } from './revenues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Payment } from '../payments/entities/payment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment])],
  controllers: [RevenuesController],
  providers: [RevenuesService]
})
export class RevenuesModule {}
