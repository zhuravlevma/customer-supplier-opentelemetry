import { Module } from '@nestjs/common';
import { logger } from './pino';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { WarehouseModule } from './warehouse/warehouse.module';
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        logger: logger,
      },
    }),
    WarehouseModule,
  ],
})
export class AppModule {}
