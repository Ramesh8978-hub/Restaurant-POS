import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableRepository } from './repository/tables.repository';
import { TableStatusRepository } from 'src/table-status/repository/table-status.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([TableRepository,TableStatusRepository,UserRepository])],
  controllers: [TablesController],
  providers: [TablesService]
})
export class TablesModule {}
