import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('kafka') private readonly kafka: ClientKafka) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  async getHello(): Promise<string> {
    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        res('World');
      }, Math.floor(Math.random() * (3000 - 500 + 1)) + 500);
    });

    const [value] = (await Promise.all([promise])) as string[];

    const info = { value };

    await this.kafka.emit('test', info);
    return value;
  }
}
