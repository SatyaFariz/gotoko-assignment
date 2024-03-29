import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from 'db/data-source';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CashiersModule } from './cashiers/cashiers.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { RevenuesModule } from './revenues/revenues.module';
import { SoldsModule } from './solds/solds.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
    UserModule, ProductsModule, CategoriesModule, CashiersModule, PaymentsModule, OrdersModule, RevenuesModule, SoldsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
