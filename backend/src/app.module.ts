import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import path from 'path';
import * as winston from 'winston'
import { ClientsModule } from './clients/clients.module';
import configuration from './config/configuration';
import { OrdersModule } from './orders/orders.module';

@Module({ 
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
      load: [configuration] 
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>  ({
        uri: configService.get<string>('database.uri')
      }),
      inject: [ConfigService]
    }),
    WinstonModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        level: configService.get<string>('loggingLevel'),
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true })
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ 
            filename: configService.get<string>('logErrFile'), 
            level: 'error' 
          }),
          new winston.transports.File({ 
            filename: configService.get<string>('logFile') 
          }),
        ],
      }),
      inject: [ConfigService]
    }),
    OrdersModule,
    ClientsModule
  ],
})
export class AppModule {} 
