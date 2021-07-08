import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusRepository } from './repository/order-status.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports :[TypeOrmModule.forFeature([OrderStatusRepository,UserRepository])],
  controllers: [OrderStatusController],
  providers: [OrderStatusService]
})
export class OrderStatusModule {}
