import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './domain/report.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { logger } from 'src/pino';

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
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
