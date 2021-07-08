import { Test, TestingModule } from '@nestjs/testing';
import { PaymentModeController } from './payment-mode.controller';
import { PaymentModeService } from './payment-mode.service';

describe('PaymentModeController', () => {
  let controller: PaymentModeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentModeController],
      providers: [PaymentModeService],
    }).compile();

    controller = module.get<PaymentModeController>(PaymentModeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
