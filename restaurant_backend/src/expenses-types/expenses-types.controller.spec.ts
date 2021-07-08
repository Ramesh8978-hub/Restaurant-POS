import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesTypesController } from './expenses-types.controller';
import { ExpensesTypesService } from './expenses-types.service';

describe('ExpensesTypesController', () => {
  let controller: ExpensesTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesTypesController],
      providers: [ExpensesTypesService],
    }).compile();

    controller = module.get<ExpensesTypesController>(ExpensesTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
