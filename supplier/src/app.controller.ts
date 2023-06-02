import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OtelMethodCounter } from 'nestjs-otel';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @OtelMethodCounter()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
