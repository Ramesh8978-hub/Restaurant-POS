import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toTitleCase } from 'src/common/toLowerCase/toLowerCase';
import { FeedbackServiceRepository } from 'src/feedback-services/repository/feedback-services.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbackRepository } from './repository/feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackRepository) private readonly feedbackRepository: FeedbackRepository,
    @InjectRepository(FeedbackServiceRepository) private readonly feedbackServicesRepository: FeedbackServiceRepository,
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository) { }

  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      let question = await this.feedbackServicesRepository.findOne({ id: createFeedbackDto.questionId })
      let waiter = await this.userRepository.findOne({ id: createFeedbackDto.waiterId })
      await this.feedbackRepository.insert({
        waiter: waiter,
        customerName: toTitleCase(createFeedbackDto.customerName),
        question: question,
        feedback: createFeedbackDto.feedback,
        createdAt: new Date().toISOString().toString(),

      });
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
      return await this.feedbackRepository.find({ relations: ['question', 'waiter'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(waiterId: number) {
    try {
      let waiter = await this.userRepository.findOne({ where: { id: waiterId } })
      const feedbackData = await this.feedbackRepository.find({ where: { waiter }, relations: ['question', 'waiter'] })
      if (!feedbackData) {
        throw new HttpException("Cannot find the Feedback", HttpStatus.NOT_FOUND)
      }
      else {
        return feedbackData
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
