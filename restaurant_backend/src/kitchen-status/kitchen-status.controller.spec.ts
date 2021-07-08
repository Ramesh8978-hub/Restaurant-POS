import { Test, TestingModule } from '@nestjs/testing';
import { KitchenStatusController } from './kitchen-status.controller';
import { KitchenStatusService } from './kitchen-status.service';

describe('KitchenStatusController', () => {
  let controller: KitchenStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitchenStatusController],
      providers: [KitchenStatusService],
    }).compile();

    controller = module.get<KitchenStatusController>(KitchenStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
