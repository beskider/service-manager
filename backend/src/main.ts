import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() { 
  
  const app = await NestFactory.create(AppModule)
  
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  
  await app.listen(port)
}
bootstrap();
