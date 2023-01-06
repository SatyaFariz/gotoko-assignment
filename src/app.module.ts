import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: 'db',
      username: 'admin',
      password: 'password',
      database: 'app',
      entities: ['dist/**/*.entity.js'],
      synchronize: true
    }), 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
