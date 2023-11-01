import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './global/filter/http-exception.filter';
import { ResponseFormatInterceptor } from './global/interceptor/response-format/response-format.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 应用全局的异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局过滤器
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  await app.listen(3000);
}
bootstrap();
