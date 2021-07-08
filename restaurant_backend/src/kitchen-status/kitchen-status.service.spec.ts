import { Test, TestingModule } from '@nestjs/testing';
import { KitchenStatusService } from './kitchen-status.service';

describe('KitchenStatusService', () => {
  let service: KitchenStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KitchenStatusService],
    }).compile();

    service = module.get<KitchenStatusService>(KitchenStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
