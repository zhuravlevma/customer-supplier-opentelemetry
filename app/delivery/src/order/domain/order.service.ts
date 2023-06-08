import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { OrderValidatedDto } from '../dtos/report.validated.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
  createOffer(reportVlidatedDto: OrderValidatedDto) {
    const offerEntity = new OrderEntity({
      id: uuid(),
      ...reportVlidatedDto,
      information: reportVlidatedDto.description,
      codeOfAccounting: reportVlidatedDto.code,
      addressOfAccounting: reportVlidatedDto.address,
    });

    // save to repository
    return offerEntity;
  }
}
