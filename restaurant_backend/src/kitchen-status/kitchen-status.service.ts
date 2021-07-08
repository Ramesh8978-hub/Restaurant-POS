import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KitchenUpdateStatus } from 'src/common/enums/kitchen-status';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateKitchenStatusDto } from './dto/create-kitchen-status.dto';
import { UpdateKitchenStatusDto } from './dto/update-kitchen-status.dto';
import { KitchenStatusRepository } from './repository/kitchen-status.repository';

@Injectable()
export class KitchenStatusService {
  constructor(
    @InjectRepository(KitchenStatusRepository) private kitchenStatusRepository: KitchenStatusRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,

  ) { }
  async create(createKitchenStatusDto: CreateKitchenStatusDto) {
    try {
      let createdBy = await this.userRepository.findOne({ id: createKitchenStatusDto.createdBy })
      if (KitchenUpdateStatus[createKitchenStatusDto.kitchenStatus.toUpperCase()]) {
        await this.kitchenStatusRepository.insert({
          kitchenStatus: KitchenUpdateStatus[createKitchenStatusDto.kitchenStatus.toUpperCase()],
          status: true,
          createdAt: new Date().toISOString().toString(),
          createdBy: createdBy,
        });
        return {
          status: 201,
          message: "Added Successfully"
        }
      } else {
        throw new HttpException("Invalid Kitchen-Status", HttpStatus.BAD_REQUEST)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findAll() {
    try {
      return this.kitchenStatusRepository.find({ relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      const kitchenStatusData = await this.kitchenStatusRepository.findOne({ id }, { relations: ['createdBy'] })
      if (!kitchenStatusData) {
        throw new HttpException("Cannot find the Kitchen-status", HttpStatus.NOT_FOUND)
      } else {
        return kitchenStatusData;
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateKitchenStatusDto: UpdateKitchenStatusDto) {
    try {
      const kitchenStatus = await this.kitchenStatusRepository.findOne({ where: { id } })

      if (kitchenStatus.status === updateKitchenStatusDto.status) {
        if (KitchenUpdateStatus[updateKitchenStatusDto.kitchenStatus.toUpperCase()]) {
          await this.kitchenStatusRepository.update({ id }, {
            kitchenStatus: KitchenUpdateStatus[updateKitchenStatusDto.kitchenStatus.toUpperCase()],
            updatedAt: new Date().toISOString().toString(),
            updatedBy: updateKitchenStatusDto.updatedBy,
          });
          return {
            status: 200,
            message: 'Updated Successfully'
          }
        }
        else {
          throw new HttpException("Invalid Kitchen-Status", HttpStatus.BAD_REQUEST)
        }
      }
      else {
        await this.kitchenStatusRepository.update({ id }, {
          status: updateKitchenStatusDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateKitchenStatusDto.updatedBy,
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
      const kitchenStatusData = await this.kitchenStatusRepository.findOne({ where: { id } })
      if (!kitchenStatusData) {
        throw new HttpException("Cannot find the Kitchen-status", HttpStatus.NOT_FOUND)
      } else {
        return await this.kitchenStatusRepository.remove(kitchenStatusData);
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
