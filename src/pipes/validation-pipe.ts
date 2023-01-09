import { ArgumentMetadata } from '@nestjs/common';
import { ValidationPipe as NestValidationPipe } from '@nestjs/common'

export class ValidationPipe extends NestValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    if(metadata.type === 'body' && Object.keys(value).length === 0) {
      // custom validation in the service
      return {}
    } else {
      return super.transform(value, metadata);
    }
  }
}