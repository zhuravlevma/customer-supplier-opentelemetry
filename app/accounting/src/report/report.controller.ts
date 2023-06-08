import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ReportService } from './domain/report.service';
import { PatchOrderDto } from './dtos/patch-order.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Patch('orders/:orderId')
  patchOrder(@Body() patchOrderDto: PatchOrderDto): Promise<string> {
    return this.reportService.patchOrder(patchOrderDto);
  }
}
