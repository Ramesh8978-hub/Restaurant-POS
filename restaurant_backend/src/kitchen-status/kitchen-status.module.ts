import { Module } from '@nestjs/common';
import { KitchenStatusService } from './kitchen-status.service';
import { KitchenStatusController } from './kitchen-status.controller';
import { KitchenStatusRepository } from './repository/kitchen-status.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports :[TypeOrmModule.forFeature([KitchenStatusRepository,UserRepository])],
  controllers: [KitchenStatusController],
  providers: [KitchenStatusService]
})
export class KitchenStatusModule {}
