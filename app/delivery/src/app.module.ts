import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { logger } from './pino';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        logger: logger,
      },
    }),
    OrderModule,
  ],
})
export class AppModule {}
