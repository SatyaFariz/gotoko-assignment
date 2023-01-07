import { Injectable } from '@nestjs/common';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cashier } from './entities/cashier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CashiersService {
  constructor(@InjectRepository(Cashier) private cashierRepository: Repository<Cashier>) {}
  
  create(createCashierDto: CreateCashierDto) {
    const newCashier = this.cashierRepository.create(createCashierDto);
    return this.cashierRepository.save(newCashier);
  }

  findAll() {
    return `This action returns all cashiers`;
  }

  findOne(id: number) {
    return this.cashierRepository.findOneById(id);
  }

  async update(id: number, updateCashierDto: UpdateCashierDto) {
    const cashier = await this.findOne(id);
    return this.cashierRepository.save({ cashierId: cashier.cashierId, ...updateCashierDto });
  }

  remove(id: number) {
    return this.cashierRepository.delete(id);
  }
}
