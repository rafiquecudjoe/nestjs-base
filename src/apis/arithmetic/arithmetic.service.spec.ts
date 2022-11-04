import { Test, TestingModule } from '@nestjs/testing';
import { ArithmeticService } from './arithmetic.service';
import { ArithmeticValidator } from './arithmetic.validator';

describe('ArithmeticService', () => {
  let service: ArithmeticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArithmeticService, ArithmeticValidator],
    }).compile();

    service = module.get<ArithmeticService>(ArithmeticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
