import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'customer',
            brokers: ['kafka:9092'],
            retry: {
              initialRetryTime: 30000,
            },
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
