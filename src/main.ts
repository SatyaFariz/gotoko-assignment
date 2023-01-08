import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SuccessInterceptor } from './interceptors/success'
import { ErrorInterceptor } from './interceptors/error'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalFilters(new ErrorInterceptor());
  await app.listen(3000);
}
bootstrap();
