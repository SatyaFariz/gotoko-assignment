import { HttpException } from '@nestjs/common';
import { ExceptionPayloadDto } from '../dto/exception-payload.dto'

export default class CustomHttpException extends HttpException {
  constructor(payload: ExceptionPayloadDto, statusCode: number) {
    super(payload, statusCode)
  }
}