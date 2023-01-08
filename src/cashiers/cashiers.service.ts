import { Injectable } from '@nestjs/common';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCashiersQueryParamsDto } from './dto/find-cashiers-query-params.dto';
import { Cashier } from './entities/cashier.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { sign } from 'jsonwebtoken'
import { HttpException } from '../classes'

@Injectable()
export class CashiersService {
  private notFoundMessage: string = 'Cashier Not Found';

  constructor(@InjectRepository(Cashier) private cashierRepository: Repository<Cashier>) {}
  
  create(createCashierDto: CreateCashierDto) {
    const newCashier = this.cashierRepository.create(createCashierDto);
    return this.cashierRepository.save(newCashier);
  }

  async find(query: FindCashiersQueryParamsDto) {
    const { skip, limit } = query;
    const [cashiers, total] = await this.cashierRepository.findAndCount({
      skip,
      take: limit,
      select: ['cashierId', 'name']
    });

    return {
      cashiers,
      meta: {
        total,
        skip,
        limit
      }
    };
  }

  async findOne(id: number) {
    const cashier = await this.cashierRepository.findOne({
      where: {
        cashierId: id
      },
      select: ['cashierId', 'name']
    });

    if(!cashier)
      throw new HttpException({ message: this.notFoundMessage }, 404);
      
    return cashier;
  }

  async update(id: number, updateCashierDto: UpdateCashierDto) {
    const cashier = await this.findOne(id);
    return this.cashierRepository.save({ ...cashier, ...updateCashierDto });
  }

  async remove(id: number) {
    const result = await this.cashierRepository.delete(id);
    
    if(result.affected === 0) {
      throw new HttpException({ message: this.notFoundMessage }, 404);
    }
  }

  async getPasscode(id: number) {
    const cashier = await this.cashierRepository.findOne({
      where: {
        cashierId: id
      },
      select: ['passcode']
    });

    if(!cashier)
      throw new HttpException({ message: this.notFoundMessage }, 404);
      
    return cashier;
  }

  async login(id: number, authDto: AuthDto) {
    const access_secret = 'highly_confidential'
    const cashier = await this.getPasscode(id)

    if(authDto.passcode === cashier?.passcode) {
      const token = sign({ cashierId: id }, access_secret)
      return {
        token
      }
    }
  }
}
