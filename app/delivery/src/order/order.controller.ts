import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { OrderValidatedDto } from './dtos/report.validated.dto';
import { OrderService } from './domain/order.service';
import { Logger } from 'nestjs-pino';

@Controller()
export class OrderController {
  constructor(
    private readonly offerService: OrderService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern('order-validated')
  readMessage(@Payload() message: OrderValidatedDto) {
    this.logger.log({
      message: JSON.stringify(message),
    });
    return this.offerService.createOffer(message);
  }
}
