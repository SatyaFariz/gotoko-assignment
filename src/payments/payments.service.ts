import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FindPaymentsQueryParamsDto } from './dto/find-payments-query-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { HttpException } from '../classes'

@Injectable()
export class PaymentsService {
  private notFoundMessage: string = 'Payment Not Found';

  constructor(@InjectRepository(Payment) private paymentRepository: Repository<Payment>) {}

  create(createPaymentDto: CreatePaymentDto) {
    const newPayment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(newPayment);
  }

  async find(query: FindPaymentsQueryParamsDto) {
    const { skip, limit } = query;
    const [payments, total] = await this.paymentRepository.findAndCount({
      skip,
      take: limit
    });

    return {
      payments,
      meta: {
        total,
        skip,
        limit
      }
    };
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOneById(id);

    if(!payment)
      throw new HttpException({ message: this.notFoundMessage }, 404);
      
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const result = await this.paymentRepository.update(id, updatePaymentDto);
    if(result.affected === 0) {
      throw new HttpException({ message: this.notFoundMessage }, 404);
    }
  }

  async remove(id: number) {
    const result = await this.paymentRepository.delete(id);
    if(result.affected === 0) {
      throw new HttpException({ message: this.notFoundMessage }, 404);
    }
  }
}
