import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './domain/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
