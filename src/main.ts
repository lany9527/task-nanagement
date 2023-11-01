import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './global/filter/http-exception.filter';
import { ResponseFormatInterceptor } from './global/interceptor/response-format/response-format.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 应用全局的异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局过滤器
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Task Management')
    .setDescription('Task Management API 文档')
    .setVersion('1.0')
    .addTag('task')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
