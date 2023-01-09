import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const message: string = (exception as TypeORMError).message;
        const code: number = (exception as any).code;
        const customResponse = {
            success: false,
            message: 'Something Went Wrong',
            error: [{ 
              type: code.toString(), 
              message: message,
              path: [],
              context: {}
            }]
        };

        response.status(500).json(customResponse);
    }
}