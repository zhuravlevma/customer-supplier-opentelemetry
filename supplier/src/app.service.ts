import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private readonly logger: PinoLogger) {}

  //   async getHello(greeting = 'Hello'): Promise<string> {
  //     this.logger.info({ msg: 'Hello method', data: { message: greeting } });

  //     // const res = await axios.get('http://127.0.0.1:4000/world');
  //     console.log('dwdw');

  //     const { data } = await this.httpService
  //       .get('/world', { baseURL: '127.0.0.1:4000' })
  //       .toPromise();
  //     return `${greeting} ${data}`;
  //   }

  get(): string {
    return 'Hello World!';
  }
}
