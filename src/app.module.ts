import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from 'db/data-source';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
    UserModule, CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
