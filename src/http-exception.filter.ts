import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let msg: string | object = exception.message; // 默认类型是 string，因为 message 可能是字符串
    if (exception.getResponse() instanceof Object) {
      msg = (exception.getResponse() as any).message || msg;
    }

    response.status(status).json({
      code: status,
      data: null,
      msg,
    });
  }
}
