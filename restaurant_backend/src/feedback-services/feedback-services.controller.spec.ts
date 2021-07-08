import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackServicesController } from './feedback-services.controller';
import { FeedbackServicesService } from './feedback-services.service';

describe('FeedbackServicesController', () => {
  let controller: FeedbackServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackServicesController],
      providers: [FeedbackServicesService],
    }).compile();

    controller = module.get<FeedbackServicesController>(FeedbackServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
