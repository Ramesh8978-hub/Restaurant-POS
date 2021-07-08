import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpensesRepository } from './repository/expenses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesTypeRepository } from 'src/expenses-types/repository/enpenses-types.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { PaymentModeRepository } from 'src/payment-mode/repository/payment-mode.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    ExpensesRepository,
    ExpensesTypeRepository,
    UserRepository,
    PaymentModeRepository
  ])],
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule { }
