import { Injectable } from '@nestjs/common';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { Order } from '../orders/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Payment } from '../payments/entities/payment.entity';

@Injectable()
export class RevenuesService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private dataSource: DataSource
  ) {}

  create(createRevenueDto: CreateRevenueDto) {
    return 'This action adds a new revenue';
  }

  async findAll() {
    const payments = await this.paymentRepository.find()

    const todayOrders = await this.dataSource
    .getRepository(Order)
    .createQueryBuilder("order")
    .where("DATE(createdAt) = CURDATE()")
    .getMany()

    const paymentTypes = payments.map(payment => {
      const orders = todayOrders.filter(order => order.paymentPaymentId === payment.paymentId)
      const totalAmount = orders.reduce((total, currentItem) => {
        total = total + currentItem.totalPrice
        return total
      }, 0)

      return {
        paymentTypeId: payment.paymentId,
        name: payment.name,
        logo: payment.logo,
        totalAmount
      }
    })

    const totalRevenue = paymentTypes.reduce((total, currentItem) => {
      total = total + currentItem.totalAmount
      return total
    }, 0)

    return {
      totalRevenue,
      paymentTypes
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} revenue`;
  }

  update(id: number, updateRevenueDto: UpdateRevenueDto) {
    return `This action updates a #${id} revenue`;
  }

  remove(id: number) {
    return `This action removes a #${id} revenue`;
  }
}
