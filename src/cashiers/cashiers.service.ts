import { Injectable } from '@nestjs/common';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cashier } from './entities/cashier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CashiersService {
  constructor(@InjectRepository(Cashier) private categoryRepository: Repository<Cashier>) {}
  
  create(createCashierDto: CreateCashierDto) {
    const newCashier = this.categoryRepository.create(createCashierDto);
    return this.categoryRepository.save(newCashier);
  }

  findAll() {
    return `This action returns all cashiers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashier`;
  }

  update(id: number, updateCashierDto: UpdateCashierDto) {
    return `This action updates a #${id} cashier`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashier`;
  }
}
