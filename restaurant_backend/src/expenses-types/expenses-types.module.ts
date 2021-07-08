import { Module } from '@nestjs/common';
import { ExpensesTypesService } from './expenses-types.service';
import { ExpensesTypesController } from './expenses-types.controller';
import { ExpensesTypeRepository } from './repository/enpenses-types.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repository/user.repository';


@Module({
  imports :[TypeOrmModule.forFeature([ExpensesTypeRepository,UserRepository])],
  controllers: [ExpensesTypesController],
  providers: [ExpensesTypesService]
})
export class ExpensesTypesModule {}
