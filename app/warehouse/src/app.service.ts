import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { OtelMethodCounter, Span, TraceService } from 'nestjs-otel';

@Injectable()
export class AppService {
  constructor(private readonly logger: PinoLogger) {}

  async getHello(greeting = 'Hello'): Promise<string> {
    this.logger.info({ msg: 'Hello method', data: { message: greeting } });
    console.log('dwdw');

    const { data } = await axios.get('http://nestjs-accounting:4000/world');
    return `${greeting} ${data}`;
  }

  get(): string {
    return 'Hello World!2323323';
  }
}
