import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import{FeedbackRepository} from './repository/feedback.repository'
import { FeedbackServiceRepository } from 'src/feedback-services/repository/feedback-services.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports :[TypeOrmModule.forFeature([FeedbackRepository,FeedbackServiceRepository,UserRepository])],

  controllers: [FeedbackController],
  providers: [FeedbackService]
})
export class FeedbackModule {}
