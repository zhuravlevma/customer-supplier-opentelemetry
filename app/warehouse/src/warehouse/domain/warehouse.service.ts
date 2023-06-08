import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import axios from 'axios';
import { OrderEntity } from './order.entity';
import { PatchOrderDto } from '../dtos/patch-order-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly logger: PinoLogger) {}

  async patchOrder(orderId: string): Promise<OrderEntity> {
    // load from repository
    const orderEntity = new OrderEntity({
      id: 'testId',
      orderId: 'orderId',
      description: 'description',
      information: 'information',
      code: 'code',
      address: 'address',
      money: 'string',
    });
    this.logger.info({ msg: 'patch order', data: JSON.stringify(orderEntity) });

    const patchOrderDto: PatchOrderDto = {
      id: 'testId',
      orderId: 'orderId',
      description: 'description',
      information: 'information',
      code: 'code',
      codeOfWarehouse: orderEntity.code,
      addressOfWarehouse: orderEntity.address,
    };

    const { data } = await axios.patch(
      'http://nestjs-accounting:4000/reports/orders/' + orderId,
      patchOrderDto,
    );
    return orderEntity;
  }
}
