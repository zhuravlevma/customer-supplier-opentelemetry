import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from 'nestjs-pino';
import { HttpModule } from '@nestjs/axios';
import { logger } from './pino';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import pino from 'pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        logger: logger,
        // stream: pino.destination({
        //   dest: '/app/logs/supplier.log', // omit for stdout
        //   minLength: 4096, // Buffer before writing
        //   sync: false, // Asynchronous logging
        // }),
        // transport: {}
      },
      //   exclude: [{ method: RequestMethod.ALL, path: 'health' }],
    }),
    // OpenTelemetryModule.forRoot({
    //   metrics: {
    //     hostMetrics: true,
    //     apiMetrics: {
    //       enable: true,
    //     },
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
