import { Module } from '@nestjs/common';
import { FeedbackServicesService } from './feedback-services.service';
import { FeedbackServicesController } from './feedback-services.controller';
import { FeedbackServiceRepository } from './repository/feedback-services.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports :[TypeOrmModule.forFeature([FeedbackServiceRepository,UserRepository])],
  controllers: [FeedbackServicesController],
  providers: [FeedbackServicesService]
})
export class FeedbackServicesModule {}
