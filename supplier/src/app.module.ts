import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenTelemetryModule } from 'nestjs-otel';
import { loggerOptions } from './options';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true,
        apiMetrics: {
          enable: true,
        },
      },
    }),
    LoggerModule.forRoot({ ...loggerOptions }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
