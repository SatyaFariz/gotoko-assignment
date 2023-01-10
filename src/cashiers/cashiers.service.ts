import { Injectable, Inject } from '@nestjs/common';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCashiersQueryParamsDto } from './dto/find-cashiers-query-params.dto';
import { Cashier } from './entities/cashier.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { HttpException } from '../classes'
import generateCreateEmptyBodyErrorObject from '../helpers/generateCreateEmptyBodyErrorObject'
import generateUpdateEmptyBodyErrorObject from '../helpers/generateUpdateEmptyBodyErrorObject'
import { JWT_SECRET } from '../constants'

@Injectable()
export class CashiersService {
  private notFoundMessage: string = 'Cashier Not Found';

  constructor(
    @Inject('JWT_REDIS') private readonly jwtRedis,
    @InjectRepository(Cashier) private cashierRepository: Repository<Cashier>
  ) {}
  
  create(createCashierDto: CreateCashierDto) {
    if(Object.keys(createCashierDto).length === 0) {
      const error = generateCreateEmptyBodyErrorObject(['name', 'passcode'])
      throw new HttpException(error, 400)
    }
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
    if(Object.keys(updateCashierDto).length === 0) {
      const error = generateUpdateEmptyBodyErrorObject(['name', 'passcode'])
      throw new HttpException(error, 400)
    }
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
    if(Object.keys(authDto).length === 0) {
      const error = generateCreateEmptyBodyErrorObject(['passcode'])
      throw new HttpException(error, 400)
    }

    const cashier = await this.getPasscode(id)

    if(authDto.passcode === cashier?.passcode) {
      const token = await this.jwtRedis.sign({ cashierId: id }, JWT_SECRET)
      return {
        token
      }
    } else {
      const error = {
        message: "Passcode Not Match",
        error: {}
      }
      throw new HttpException(error, 401)
    }
  }
}
