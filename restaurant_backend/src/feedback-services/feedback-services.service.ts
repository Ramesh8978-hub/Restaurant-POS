import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateFeedbackServiceDto } from './dto/create-feedback-service.dto';
import { UpdateFeedbackServiceDto } from './dto/update-feedback-service.dto';
import { FeedbackServiceRepository } from './repository/feedback-services.repository';

@Injectable()
export class FeedbackServicesService {
  constructor(
    @InjectRepository(FeedbackServiceRepository) private feedbackServiceRepository: FeedbackServiceRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository

  ) { }
  async create(createFeedbackServiceDto: CreateFeedbackServiceDto) {
    try {
      let createdBy = await this.userRepository.findOne({ id: createFeedbackServiceDto.createdBy });
      await this.feedbackServiceRepository.insert({
        question: createFeedbackServiceDto.question,
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

  async getAllFeedbackServices() {
    try {
      return await this.feedbackServiceRepository.find({ relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getFeedbackServicesByStatus() {
    try {
      return await this.feedbackServiceRepository.find({ where: { status: true }, relations: ['createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      const feedbackServiceData = await this.feedbackServiceRepository.findOne({ where: { id }, relations: ['createdBy'] });
      if (!feedbackServiceData) {
        throw new HttpException("Cannot find the Feedback-Service", HttpStatus.NOT_FOUND)
      } else {
        return feedbackServiceData
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateFeedbackServiceDto: UpdateFeedbackServiceDto) {
    try {
      let feedbackService = await this.feedbackServiceRepository.findOne({ where: { id } })
      if (feedbackService.status === updateFeedbackServiceDto.status) {
        await this.feedbackServiceRepository.update({ id }, {
          question: updateFeedbackServiceDto.question,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateFeedbackServiceDto.updatedBy
        })
        return {
          status: 200,
          message: 'Updated Successfully'
        }
      }
      else {
        await this.feedbackServiceRepository.update({ id }, {
          status: updateFeedbackServiceDto.status,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: updateFeedbackServiceDto.updatedBy
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
      const feedbackServiceData = await this.feedbackServiceRepository.findOne({ where: { id } });
      if (!feedbackServiceData) {
        throw new HttpException("Cannot find the Feedback-Service", HttpStatus.NOT_FOUND)
      } else {
        return await this.feedbackServiceRepository.remove(feedbackServiceData);
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
