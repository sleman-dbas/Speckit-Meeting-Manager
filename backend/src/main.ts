import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ErrorInterceptor());
  await app.listen(3000);
  console.log('Backend is running on http://localhost:3000');
}

bootstrap();
