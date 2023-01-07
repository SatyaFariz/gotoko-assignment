import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FindPaymentsQueryParamsDto } from './dto/find-payments-query-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
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

  findOne(id: number) {
    return this.paymentRepository.findOneById(id);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(id, updatePaymentDto);
  }

  remove(id: number) {
    return this.paymentRepository.delete(id);
  }
}
