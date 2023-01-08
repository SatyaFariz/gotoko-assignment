import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ErrorInterceptor implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const data: any = exception.getResponse();
    response
      .status(status)
      .json({
        success: false,
        message: data.message,
        error: data.error || {}
      });
  }
}