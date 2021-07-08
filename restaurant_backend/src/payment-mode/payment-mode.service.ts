import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toTitleCase } from 'src/common/toLowerCase/toLowerCase';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreatePaymentModeDto } from './dto/create-payment-mode.dto';
import { UpdatePaymentModeDto } from './dto/update-payment-mode.dto';
import { PaymentModeRepository } from './repository/payment-mode.repository';

@Injectable()
export class PaymentModeService {
  constructor(
    @InjectRepository(PaymentModeRepository) private paymentModeRepository: PaymentModeRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) { }

  async create(createPaymentModeDto: CreatePaymentModeDto) {
    try {
      let createdBy = await this.userRepository.findOne({ id: createPaymentModeDto.createdBy })
      await this.paymentModeRepository.insert({
        paymentMode: toTitleCase(createPaymentModeDto.paymentMode),
        status: true,
        createdAt: new Date().toISOString().toString(),
        createdBy: createdBy,
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

  async getAllPaymentModes() {
    try {
      return await this.paymentModeRepository.find({ relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getPaymentModeByStatus() {
    try {
      return await this.paymentModeRepository.find({ where:{status:true},relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      const paymentModeData = await this.paymentModeRepository.findOne({ where: { id }, relations: ['createdBy'] })
      if (paymentModeData) {
        return paymentModeData;
      } else {
        throw new HttpException("Cannot find the PaymentMode", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updatePaymentModeDto: UpdatePaymentModeDto) {
    try {
      let paymentMode = await this.paymentModeRepository.findOne({ where: { id } });
      if (paymentMode.status === updatePaymentModeDto.status) {
        await this.paymentModeRepository.update({ id }, {
          paymentMode: toTitleCase(updatePaymentModeDto.paymentMode),
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updatePaymentModeDto.updatedBy,
        });
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }
      else {
        await this.paymentModeRepository.update({ id }, {
          status: updatePaymentModeDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updatePaymentModeDto.updatedBy,
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
      const paymentModeData = await this.paymentModeRepository.findOne({ where: { id } })
      if (paymentModeData) {
        return await this.paymentModeRepository.remove(paymentModeData);
      }
      else {
        throw new HttpException("Cannot find the PaymentMode", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
