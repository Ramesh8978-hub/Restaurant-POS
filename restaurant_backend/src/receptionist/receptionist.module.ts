import { Module } from '@nestjs/common';
import { ReceptionistService } from './receptionist.service';
import { ReceptionistController } from './receptionist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersItemRepository } from 'src/orders-items/repository/orders-items.repository';
import { OrderRepository } from 'src/orders/repository/orders.repository';
import { ItemRepository } from 'src/items/repository/items.repository';

@Module({
  imports :[TypeOrmModule.forFeature([OrdersItemRepository,OrderRepository,ItemRepository])],
  controllers: [ReceptionistController],
  providers: [ReceptionistService]
})
export class ReceptionistModule {}
