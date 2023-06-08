import { Controller, Param, Patch } from '@nestjs/common';
import { WarehouseService } from './domain/warehouse.service';
import { Logger } from 'nestjs-pino';
import { OrderEntity } from './domain/order.entity';

@Controller('warehouses')
export class WarehouseController {
  constructor(
    private readonly appService: WarehouseService,
    private readonly logger: Logger,
  ) {}

  @Patch('orders/:orderId')
  patchOrder(@Param('orderId') orderId): Promise<OrderEntity> {
    this.logger.log('Calling patchOrder()', WarehouseController.name);
    return this.appService.patchOrder(orderId);
  }
}
