import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { startOfDay, endOfDay } from 'date-fns';
import { toTitleCase } from 'src/common/toLowerCase/toLowerCase';
import { ExpensesTypeRepository } from 'src/expenses-types/repository/enpenses-types.repository';
import { PaymentModeRepository } from 'src/payment-mode/repository/payment-mode.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { Between } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesRepository } from './repository/expenses.repository';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpensesRepository) private expensesRepository: ExpensesRepository,
    @InjectRepository(ExpensesTypeRepository) private expensesTypeRepository: ExpensesTypeRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(PaymentModeRepository) private paymentModeRepository: PaymentModeRepository
  ) { }

  async create(createExpenseDto: CreateExpenseDto) {
    try {
      let expensetype = await this.expensesTypeRepository.findOne({ id: createExpenseDto.expenseTypeId })
      let createdBy = await this.userRepository.findOne({ id: createExpenseDto.createdBy })
      let employee = await this.userRepository.findOne({ id: createExpenseDto.employeeId })
      let paymentMode = await this.paymentModeRepository.findOne({ id: createExpenseDto.paymentModeId })
      await this.expensesRepository.insert({
        expensestype: expensetype,
        date: new Date().toISOString().toString(),
        name: toTitleCase(createExpenseDto.name),
        discription: createExpenseDto.discription,
        amount: createExpenseDto.amount,
        createdAt: new Date().toISOString().toString(),
        createdBy: createdBy,
        employee: employee,
        paymentMode: paymentMode
      })
      return {
        status: 201,
        message: "Added Successfully"
      }
    }

    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      return await this.expensesRepository.find({ relations: ['expensestype', 'createdBy', 'employee', 'paymentMode'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      const expensesData = await this.expensesRepository.findOne({ id }, { relations: ['expensestype', 'createdBy', 'employee', 'paymentMode'] })
      if (!expensesData) {
        throw new HttpException("Cannot find the Expenses", HttpStatus.NOT_FOUND)
      }
      else {
        return expensesData;
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    try {
      let employee = await this.userRepository.findOne({ id: updateExpenseDto.employeeId })
      let paymentMode = await this.paymentModeRepository.findOne({ id: updateExpenseDto.paymentModeId })
      let expensetype = await this.expensesTypeRepository.findOne({ id: updateExpenseDto.expenseTypeId })
      await this.expensesRepository.update({ id }, {
        expensestype: expensetype,
        employee: employee,
        paymentMode: paymentMode,
        date: new Date().toISOString().toString(),
        name: toTitleCase(updateExpenseDto.name),
        discription: updateExpenseDto.discription,
        amount: updateExpenseDto.amount,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: updateExpenseDto.updatedBy,
      });
      return {
        status: 200,
        message: 'Updated Successfully'
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    try {
      const expensesData = await this.expensesRepository.findOne({ where: { id } })
      if (!expensesData) {
        throw new HttpException("Cannot find the Expenses", HttpStatus.NOT_FOUND)
      }
      else {
        return await this.expensesRepository.remove(expensesData);
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async reportsByDate(fromDate: string, toDate: string) {
    try {
      return await this.expensesRepository.find({
        where: {
          date: Between(startOfDay(Date.parse(fromDate)), endOfDay(Date.parse(toDate))),
        },
        relations: ['expensestype', 'createdBy', 'employee', 'paymentMode']
      })
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
