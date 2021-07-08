import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUpdateStatus } from 'src/common/enums/user-status';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateUserStatusDto } from './dto/create-user-status.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserStatusRepository } from './repository/user-status.repository';

@Injectable()
export class UserStatusService {
  constructor(
    @InjectRepository(UserStatusRepository)
    private userStatusRepository: UserStatusRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  async createuserStatus(createUserStatusDto: CreateUserStatusDto) {
    try {
      let createdBy = await this.userRepository.findOne({ id: createUserStatusDto.createdBy })
      if (UserUpdateStatus[createUserStatusDto.userStatus.toUpperCase()]) {
        await this.userStatusRepository.insert({
          userStatus: UserUpdateStatus[createUserStatusDto.userStatus.toUpperCase()],
          status: true,
          createdAt: new Date().toISOString().toString(),
          createdBy: createdBy
        })
        return{
          status:201,
          message:"Added Successfully"
        }
      }
      else {
        throw new HttpException("Invalid User-Status", HttpStatus.BAD_REQUEST)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  getAllUserStatus() {
    try {
      return this.userStatusRepository.find({ relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getUserStatusById(id: number) {
    try {
      let userStatus = this.userStatusRepository.findOne({ id }, { relations: ['createdBy'] });
      if (userStatus) {
        return userStatus
      }
      else {
        throw new HttpException("Cannot find the user-status", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateUserStatus(id: number, updateUserStatusDto: UpdateUserStatusDto) {
    try {
      const userStatus = await this.userStatusRepository.findOne({ where: { id } })

   
    
      if (userStatus.status === updateUserStatusDto.status) {
        if (UserUpdateStatus[updateUserStatusDto.userStatus.toUpperCase()]) {
         let data = await this.userStatusRepository.update({ id }, {
            userStatus: UserUpdateStatus[updateUserStatusDto.userStatus.toUpperCase()],
            updatedAt: new Date().toISOString().toString(),
            updatedBy: updateUserStatusDto.updatedBy
          })
          console.log(data);
          
          return {
            status: 200,
            message: 'Updated Successfully'
          }
        }
        else {
          throw new HttpException("Invalid User-Status", HttpStatus.BAD_REQUEST)
        }
      }
      else {
        await this.userStatusRepository.update({ id }, {
          status: updateUserStatusDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateUserStatusDto.updatedBy
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

  async removeUserStatus(id: number) {
    try {
      const userStatusData = await this.userStatusRepository.findOne(id)
      if (userStatusData) {
        return await this.userStatusRepository.remove(userStatusData);
      }
      else {
        throw new HttpException("Cannot find the user-status", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async userStatus() {
    try {
      return await this.userStatusRepository.find({
        where: { userStatus: UserUpdateStatus.NOT_AVAILABLE }
      })
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
