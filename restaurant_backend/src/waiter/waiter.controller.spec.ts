import { Test, TestingModule } from '@nestjs/testing';
import { WaiterController } from './waiter.controller';
import { WaiterService } from './waiter.service';

describe('WaiterController', () => {
  let controller: WaiterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaiterController],
      providers: [WaiterService],
    }).compile();

    controller = module.get<WaiterController>(WaiterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
