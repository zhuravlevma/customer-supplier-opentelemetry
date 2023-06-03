import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import otelSDK from './tracing';

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'customer2',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'group',
        allowAutoTopicCreation: true,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(9000);
}
bootstrap();
