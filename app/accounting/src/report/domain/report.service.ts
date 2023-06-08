import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PatchOrderDto } from '../dtos/patch-order.dto';
import { OrderEntity } from './order.entity';
@Injectable()
export class ReportService {
  constructor(@Inject('kafka') private readonly kafka: ClientKafka) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  async patchOrder(patchOrderDto: PatchOrderDto): Promise<string> {
    const orderEntity = new OrderEntity({ ...patchOrderDto });
    await this.kafka.emit('order-validated', orderEntity);
    return 'ok';
  }
}
