import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OtelMethodCounter } from 'nestjs-otel';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @OtelMethodCounter()
  @Get('world')
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
