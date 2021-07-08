import { Module } from '@nestjs/common';
import { TableStatusService } from './table-status.service';
import { TableStatusController } from './table-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableStatusRepository } from './repository/table-status.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([TableStatusRepository,UserRepository])],
  controllers: [TableStatusController],
  providers: [TableStatusService]
})
export class TableStatusModule {}
