import { Module } from '@nestjs/common';
import { ArithmeticService } from './arithmetic.service';
import { ArithmeticController } from './arithmetic.controller';
import { ArithmeticValidator } from './arithmetic.validator';

@Module({
  controllers: [ArithmeticController],
  providers: [ArithmeticService,ArithmeticValidator]
})
export class ArithmeticModule {}
