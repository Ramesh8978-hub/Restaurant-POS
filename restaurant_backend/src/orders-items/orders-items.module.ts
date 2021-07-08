import { Module } from '@nestjs/common';
import { OrdersItemsService } from './orders-items.service';
import { OrdersItemsController } from './orders-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersItemRepository } from './repository/orders-items.repository';
import { OrderRepository } from 'src/orders/repository/orders.repository';
import { ItemRepository } from 'src/items/repository/items.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { KitchenStatusRepository } from 'src/kitchen-status/repository/kitchen-status.repository';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { TableStatusRepository } from 'src/table-status/repository/table-status.repository';
import { TableRepository } from 'src/tables/repository/tables.repository';
import { OrderStatusRepository } from 'src/order-status/repository/order-status.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    OrdersItemRepository,
    OrderRepository,
    ItemRepository,
    KitchenStatusRepository,
    UserRepository,
    CategoryRepository,
    TableStatusRepository,
    TableRepository,
    OrderStatusRepository
  ])],

  controllers: [OrdersItemsController],
  providers: [OrdersItemsService]
})
export class OrdersItemsModule { }
