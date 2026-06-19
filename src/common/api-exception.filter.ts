import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/response.interface';

@Catch(BadRequestException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let message = 'Validation failed';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const responseObj = exceptionResponse as { message?: string | string[] };
      if (Array.isArray(responseObj.message)) {
        message = responseObj.message.join(', ');
      } else if (typeof responseObj.message === 'string') {
        message = responseObj.message;
      }
    }

    if (!message.includes('Validation failed:')) {
      message = `Validation failed: ${message}`;
    }

    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      message,
    };

    response.status(status).json(errorResponse);
  }
}
