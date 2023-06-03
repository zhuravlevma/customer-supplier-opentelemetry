import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from 'nestjs-pino';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger, // private readonly traceService: TraceService,
  ) {}

  @Get('hello')
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get()
  geto(): string {
    this.logger.log('Calling getHello()', AppController.name);
    return this.appService.get();
  }
}
