import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableUpdateStatus } from 'src/common/enums/table-status';
import { TableStatusRepository } from 'src/table-status/repository/table-status.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateTableDto, TableStatusDto } from './dto/table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { TableRepository } from './repository/tables.repository';

@Injectable()
export class TablesService {

  constructor(
    @InjectRepository(TableRepository) private tableRepository: TableRepository,
    @InjectRepository(TableStatusRepository) private tableStatusRepository: TableStatusRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) { }

  async createTable(createTableDto: CreateTableDto) {
    try {
      let table = await this.tableStatusRepository.findOne({ tableStatus: TableUpdateStatus.AVAILABLE })
      let createdBy = await this.userRepository.findOne({ id: createTableDto.createdBy })
      await this.tableRepository.insert({
        tableStatus: table,
        tableNumber: createTableDto.tableNumber,
        sittingCapacity: createTableDto.sittingCapacity,
        status: true,
        createdAt: new Date().toISOString().toString(),
        createdBy: createdBy
      })
      return{
        status:201,
        message:"Added Successfully"
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllTables() {
    try {
      let tableStatus = await this.tableStatusRepository.find({ where: { status: true } })
      let tableData = [];
      for await (let status of tableStatus) {
        let table = await this.tableRepository.find({ where: { tableStatus: status }, relations: ['tableStatus', 'createdBy'] });
        tableData = [...tableData, ...table]
      }
      return tableData;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTablesByStatus() {
    try {
      let tableStatus = await this.tableStatusRepository.find({ where: { status: true } })
      let tableData = [];
      for await (let status of tableStatus) {
        let table = await this.tableRepository.find({ where: { status: true, tableStatus: status }, relations: ['tableStatus', 'createdBy'] });
        tableData = [...tableData, ...table]
      }
      return tableData;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTableById(id: number) {
    try {
      const table = await this.tableRepository.findOne({ id }, { relations: ['tableStatus','createdBy'] });
      if (table) {
        return table
      } else {
        throw new HttpException("Cannot find the table", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getServedTables() {
    try {
      let tableStatus = await this.tableStatusRepository.find({
        where: [
          { status: true, tableStatus: TableUpdateStatus.PLACED },
          { status: true, tableStatus: TableUpdateStatus.SERVED }
        ]
      })
      let tableData = []
      for await (let tableStatusData of tableStatus) {
        const table = await this.tableRepository.find({ where: { status: true, tableStatus: tableStatusData }, relations: ['tableStatus'] })
        tableData = [...tableData, ...table]
      }
      return tableData
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAvailableTables() {
    try {
      let tableStatus = await this.tableStatusRepository.findOne({ where: { status: true, tableStatus: TableUpdateStatus.AVAILABLE } })
      const tableData = await this.tableRepository.find({ where: { status: true, tableStatus }, relations: ['tableStatus'] })
      return tableData;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAvailableAndBookeTables() {
    try {
      let tableStatus = await this.tableStatusRepository.find({
         where: [
           { status: true, tableStatus: TableUpdateStatus.AVAILABLE },
           { status: true, tableStatus: TableUpdateStatus.BOOKED }
          ] 
        })
        let data = [];
        for await(let status of tableStatus){
          const tableData = await this.tableRepository.find({ where: { status: true, tableStatus:status }, relations: ['tableStatus'] })
          data.push(tableData)
        }
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateTable(id: number, updateTableDto: UpdateTableDto) {
    try {
      const table = await this.tableRepository.findOne({ id });
      if (table.status === updateTableDto.status) {
        await this.tableRepository.update({ id }, {
          tableNumber: updateTableDto.tableNumber,
          sittingCapacity: updateTableDto.sittingCapacity,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateTableDto.updatedBy
        })
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }
      else {
        await this.tableRepository.update({ id }, {
          status: updateTableDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateTableDto.updatedBy
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

  async updateTableStatus(id: number, tableStatusDto: TableStatusDto) {
    try {
      let tableStatus = await this.tableStatusRepository.findOne({ id: tableStatusDto.tableStatusId })
      await this.tableRepository.update({ id }, {
        tableStatus,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: tableStatusDto.updatedBy
      })
      return {
        status: 200,
        message: 'Table Status updated succsessfully'
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async removeTable(id: number) {
    try {
      const tableData = await this.tableRepository.findOne(id)
      if (tableData) {
        return this.tableRepository.remove(tableData);
      }
      else {
        throw new HttpException("Cannot find the table", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
