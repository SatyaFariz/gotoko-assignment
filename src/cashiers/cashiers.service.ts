import { Injectable } from '@nestjs/common';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCashiersQueryParamsDto } from './dto/find-cashiers-query-params.dto';
import { Cashier } from './entities/cashier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CashiersService {
  constructor(@InjectRepository(Cashier) private cashierRepository: Repository<Cashier>) {}
  
  create(createCashierDto: CreateCashierDto) {
    const newCashier = this.cashierRepository.create(createCashierDto);
    return this.cashierRepository.save(newCashier);
  }

  async find(query: FindCashiersQueryParamsDto) {
    const { skip, limit } = query;
    const [cashiers, total] = await this.cashierRepository.findAndCount({
      skip,
      take: limit
    });

    return {
      cashiers: cashiers.map(cashier => this.withoutPasscode(cashier)),
      meta: {
        total,
        skip,
        limit
      }
    };
  }

  async findOne(id: number) {
    const cashier = await this.getById(id);
    return this.withoutPasscode(cashier);
  }

  async update(id: number, updateCashierDto: UpdateCashierDto) {
    const cashier = await this.findOne(id);
    return this.cashierRepository.save({ ...cashier, ...updateCashierDto });
  }

  remove(id: number) {
    return this.cashierRepository.delete(id);
  }

  async getPasscode(id: number) {
    const cashier = await this.getById(id);
    return { passcode: cashier.passcode };
  }

  private getById(id: number) {
    return this.cashierRepository.findOneById(id);
  }

  private withoutPasscode(cashier: Cashier) {
    const clone = { ...cashier };
    delete clone.passcode;
    return clone;
  }
}
