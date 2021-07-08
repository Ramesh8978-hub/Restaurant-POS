import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackServicesService } from './feedback-services.service';

describe('FeedbackServicesService', () => {
  let service: FeedbackServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackServicesService],
    }).compile();

    service = module.get<FeedbackServicesService>(FeedbackServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
