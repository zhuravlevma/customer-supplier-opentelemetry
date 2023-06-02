import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly logger: PinoLogger) {}

  async getHello(greeting = 'Hello'): Promise<string> {
    this.logger.info({ msg: 'Hello method', data: { message: greeting } });

    const { data } = await axios.get('/world', { baseURL: 'localhost:4000' });
    return `${greeting} ${data}`;
  }
}
