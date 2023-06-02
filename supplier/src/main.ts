import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import otelSDK from './tracing';
import { Logger, PinoLogger } from 'nestjs-pino';
import { loggerOptions } from './options';

async function bootstrap() {
  await otelSDK.start();
  const logger = new Logger(new PinoLogger({ ...loggerOptions }), {
    renameContext: 'Nest',
  });
  const app = await NestFactory.create(AppModule, { logger });
  await app.listen(3000);
}
bootstrap();
