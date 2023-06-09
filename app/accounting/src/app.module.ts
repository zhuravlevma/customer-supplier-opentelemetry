import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { logger } from './pino';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        logger: logger,
      },
    }),
    ClientsModule.register([
      {
        name: 'kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'accounting',
            brokers: ['kafka:9092'],
            retry: {
              initialRetryTime: 30000,
            },
          },
        },
      },
    ]),
    ReportModule,
  ],
})
export class AppModule {}
