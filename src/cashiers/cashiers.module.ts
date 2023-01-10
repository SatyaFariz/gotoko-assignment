import { Module } from '@nestjs/common';
import { CashiersService } from './cashiers.service';
import { CashiersController } from './cashiers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashier } from './entities/cashier.entity';
import { JWTRedisModule } from '../libs/jwt-redis/jwt-redis.module'

@Module({
  imports: [TypeOrmModule.forFeature([Cashier]), JWTRedisModule],
  controllers: [CashiersController],
  providers: [CashiersService]
})
export class CashiersModule {}
