import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptors';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://127.0.0.1:800', 'http://petmate.kr'],
    credentials: true,
  });
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
        domain:'.petmate.kr'
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
