import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessInterceptor } from './interceptors/success'
import { ErrorInterceptor } from './interceptors/error'
import { TypeOrmFilter } from './interceptors/typeorm-filter'
import { ValidationPipe } from './pipes/validation-pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorInterceptor(), new TypeOrmFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new SuccessInterceptor());
  await app.listen(3000);
}
bootstrap();
