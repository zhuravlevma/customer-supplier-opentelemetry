import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OtelMethodCounter, Span, TraceService } from 'nestjs-otel';
import { Logger } from 'nestjs-pino';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
    private readonly traceService: TraceService,
  ) {}

  //   @Get('hello')
  //   @OtelMethodCounter()
  //   getHello(): Promise<string> {
  //     return this.appService.getHello();
  //   }

  @Get()
  @OtelMethodCounter()
  @Span()
  geto(): string {
    // const currentSpan = this.traceService.getSpan();
    // console.log(currentSpan);

    // currentSpan.addEvent('some event');
    // currentSpan.end();
    this.logger.log('Calling getHello()', AppController.name);
    return this.appService.get();
  }
}
