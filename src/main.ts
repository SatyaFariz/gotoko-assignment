import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessInterceptor } from './interceptors/success'
import { ErrorInterceptor } from './interceptors/error'
import { TypeOrmFilter } from './interceptors/typeorm-filter'
import { ValidationPipe } from './pipes/validation-pipe'
import generateInvalidFieldsErrorObject from './helpers/generateInvalidFieldsErrorObject'
import { HttpException } from './classes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorInterceptor(), new TypeOrmFilter());
  app.useGlobalPipes(
    new ValidationPipe({ 
      transform: true, 
      whitelist: true,
      exceptionFactory: (errors) => {
        const error = generateInvalidFieldsErrorObject(errors)
        throw new HttpException(error, 400)
      }
    })
  );
  app.useGlobalInterceptors(new SuccessInterceptor());
  await app.listen(3000);
}
bootstrap();
