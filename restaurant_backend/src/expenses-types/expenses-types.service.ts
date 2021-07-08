import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toTitleCase } from 'src/common/toLowerCase/toLowerCase';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateExpensesTypeDto } from './dto/create-expenses-type.dto';
import { UpdateExpensesTypeDto } from './dto/update-expenses-type.dto';
import { ExpensesTypeRepository } from './repository/enpenses-types.repository';


@Injectable()
export class ExpensesTypesService {

  constructor(
    @InjectRepository(ExpensesTypeRepository) private expensesTypeRepository: ExpensesTypeRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository) { }

  async create(createExpensesTypeDto: CreateExpensesTypeDto) {
    try {
      let createdBy = await this.userRepository.findOne({ id: createExpensesTypeDto.createdBy })
      await this.expensesTypeRepository.insert({
        type: toTitleCase(createExpensesTypeDto.type),
        status: true,
        createdAt: new Date().toISOString().toString(),
        createdBy: createdBy
      });
      return{
        status:201,
        message:"Added Successfully"
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      return await this.expensesTypeRepository.find({ relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllByStatus() {
    try {
      return await this.expensesTypeRepository.find({where:{status:true}, relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      const ExpensesData = await this.expensesTypeRepository.findOne({ id }, { relations: ['createdBy'] })
      if (!ExpensesData) {
        throw new HttpException("Cannot find the Expenses-Type", HttpStatus.NOT_FOUND)
      }
      return {
        ExpensesData
      };
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async update(id: number, updateExpensesTypeDto: UpdateExpensesTypeDto) {
    try {
      let Expenses = await this.expensesTypeRepository.findOne({ where: { id } })
      if (Expenses.status === updateExpensesTypeDto.status) {
        await this.expensesTypeRepository.update({ id }, {
          type: toTitleCase(updateExpensesTypeDto.type),
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateExpensesTypeDto.updatedBy
        });
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }

      else {
        const ExpensesData = await this.expensesTypeRepository.update({ id }, {
          status: updateExpensesTypeDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateExpensesTypeDto.updatedBy
        });
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }

    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    const ExpensesData = await this.expensesTypeRepository.findOne({ where: { id } })
    return await this.expensesTypeRepository.remove(ExpensesData);
  }
}
