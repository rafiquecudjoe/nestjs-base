import { Test, TestingModule } from '@nestjs/testing';
import { ArithmeticController } from './arithmetic.controller';
import { ArithmeticService } from './arithmetic.service';
import { ArithmeticValidator } from './arithmetic.validator';

describe('ArithmeticController', () => {
  let controller: ArithmeticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArithmeticController],
      providers: [ArithmeticService, ArithmeticValidator],
    }).compile();

    controller = module.get<ArithmeticController>(ArithmeticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
