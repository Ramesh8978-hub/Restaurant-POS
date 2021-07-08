import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderUpdateStatus } from 'src/common/enums/order-status';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatusRepository } from './repository/order-status.repository';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectRepository(OrderStatusRepository) private orderStatusRepository: OrderStatusRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,

  ) { }
  async create(createOrderStatusDto: CreateOrderStatusDto) {
    try {
      let createdBy = await this.userRepository.findOne({ id: createOrderStatusDto.createdBy })
      if (OrderUpdateStatus[createOrderStatusDto.orderStatus.toUpperCase()]) {
        let data = await this.orderStatusRepository.insert({
          orderStatus: OrderUpdateStatus[createOrderStatusDto.orderStatus.toUpperCase()],
          status: true,
          createdAt: new Date().toISOString().toString(),
          createdBy: createdBy,
        });
        return{
          status:201,
          message:"Added Successfully"
        }
      }
      else {
        throw new HttpException("Invalid Order-Status", HttpStatus.BAD_REQUEST)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async findAll() {
    try {
      return await this.orderStatusRepository.find({ relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      const orderStatusData = await this.orderStatusRepository.findOne({ id }, { relations: ['createdBy'] })
      if (orderStatusData) {
        return orderStatusData;
      }
      else {
        throw new HttpException("Cannot find the Order-status", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    try {
      let orderStatus = await this.orderStatusRepository.findOne({ where: { id } })
      if (orderStatus.status === updateOrderStatusDto.status) {
        if (OrderUpdateStatus[updateOrderStatusDto.orderStatus.toUpperCase()]) {
          await this.orderStatusRepository.update({ id }, {
            orderStatus: OrderUpdateStatus[updateOrderStatusDto.orderStatus.toUpperCase()],
            updatedAt: new Date().toISOString().toString(),
            updatedBy: updateOrderStatusDto.updatedBy,
          });
          return {
            status: 200,
            message: 'Updated Successfully'
          }
        }
        else {
          throw new HttpException("Invalid Order-Status", HttpStatus.BAD_REQUEST)
        }
      }
      else {
        await this.orderStatusRepository.update({ id }, {
          status: updateOrderStatusDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateOrderStatusDto.updatedBy,
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
    try {
      const orderStatusData = await this.orderStatusRepository.findOne({ where: { id } })
      if (orderStatusData) {
        return this.orderStatusRepository.remove(orderStatusData);
      }
      else {
        throw new HttpException("Cannot find the Order-status", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
