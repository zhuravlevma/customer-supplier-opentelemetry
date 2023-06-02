import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import otelSDK from './tracing';
import { Logger, PinoLogger } from 'nestjs-pino';
import { loggerOptions } from './pino';

async function bootstrap() {
  await otelSDK.start();
  //   const logger = new Logger(new PinoLogger({ pinoHttp: loggerOptions }), {
  //     renameContext: 'Nest',
  //   });

  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
