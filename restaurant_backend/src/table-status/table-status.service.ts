import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableUpdateStatus } from 'src/common/enums/table-status';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateTableStatusDto } from './dto/create-table-status.dto';
import { UpdateTableStatusDto } from './dto/update-table-status.dto';
import { TableStatusRepository } from './repository/table-status.repository';

@Injectable()
export class TableStatusService {

  constructor(
    @InjectRepository(TableStatusRepository)
    private tableStatusRepository: TableStatusRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  async createTableStatus(createTableStatusDto: CreateTableStatusDto) {
    try {
      let createdBy = await this.userRepository.findOne({ id: createTableStatusDto.createdBy })
      if (TableUpdateStatus[createTableStatusDto.tableStatus.toUpperCase()]) {
        const tableStatusData = await this.tableStatusRepository.insert({
          tableStatus: TableUpdateStatus[createTableStatusDto.tableStatus.toUpperCase()],
          status: true,
          createdAt: new Date().toISOString().toString(),
          createdBy: createdBy,
        })
        return{
          status:201,
          message:"Added Successfully"
        }
      }
      else {
        throw new HttpException("Invalid Table-Status", HttpStatus.BAD_REQUEST)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  getAllTableStatus() {
    try {
      return this.tableStatusRepository.find({ relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  getTableStatusByStatus() {
    try {
      return this.tableStatusRepository.find({where:{status:true},relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  TableStatusBooked() {
    try {
      return this.tableStatusRepository.find({
        where: [
          { status: true, tableStatus: TableUpdateStatus.BOOKED },
          { status: true, tableStatus: TableUpdateStatus.NOT_AVAILABLE }
        ]
      });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  TableStatusAvailable() {
    try {
      return this.tableStatusRepository.find({
        where: [
          { status: true, tableStatus: TableUpdateStatus.AVAILABLE },
        ]
      });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTableStatusById(id: number) {
    try {
      let tableStatusData = await this.tableStatusRepository.findOne({ id }, { relations: ['createdBy'] });
      if (tableStatusData) {
        return tableStatusData
      } else {
        throw new HttpException("Cannot find the table-status", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateTableStatusDto: UpdateTableStatusDto) {
    try {

      let tableStatus = await this.tableStatusRepository.findOne({ where: { id } })
      if (tableStatus.status === updateTableStatusDto.status) {
        if (TableUpdateStatus[updateTableStatusDto.tableStatus.toUpperCase()]) {
          await this.tableStatusRepository.update({ id }, {
            tableStatus: TableUpdateStatus[updateTableStatusDto.tableStatus.toUpperCase()],
            updatedAt: new Date().toISOString().toString(),
            updatedBy: updateTableStatusDto.updatedBy,
          })
          return {
            status: 200,
            message: 'Updated Successfully'
          }
        }
        else {
          throw new HttpException("Invalid Table-Status", HttpStatus.BAD_REQUEST)
        }
      }
      else {
        await this.tableStatusRepository.update({ id }, {
          status: updateTableStatusDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateTableStatusDto.updatedBy,
        })
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
    try {
      const tableStatusData = await this.tableStatusRepository.findOne(id)
      if (tableStatusData) {
        return this.tableStatusRepository.remove(tableStatusData);
      } else {
        throw new HttpException("Cannot find the table-status", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
