import { Module } from '@nestjs/common';
import { WarehouseController as WarehouseController } from './warehouse.controller';
import { WarehouseService } from './domain/warehouse.service';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
