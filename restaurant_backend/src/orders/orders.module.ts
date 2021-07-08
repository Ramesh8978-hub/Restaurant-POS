import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repository/orders.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { TableRepository } from 'src/tables/repository/tables.repository';
import { PaymentModeRepository } from 'src/payment-mode/repository/payment-mode.repository';
import { OrderStatusRepository } from 'src/order-status/repository/order-status.repository';
import { UserStatusRepository } from 'src/user-status/repository/user-status.repository';
import { TableStatusRepository } from 'src/table-status/repository/table-status.repository';
import { OrdersItemRepository } from 'src/orders-items/repository/orders-items.repository';
import { KitchenStatusRepository } from 'src/kitchen-status/repository/kitchen-status.repository';

@Module({
  imports :[TypeOrmModule.forFeature([
    OrderRepository,
    UserRepository,
    TableRepository,
    PaymentModeRepository,
    OrderStatusRepository,
    UserStatusRepository,
    TableStatusRepository,
    OrdersItemRepository,
    KitchenStatusRepository
  ])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
