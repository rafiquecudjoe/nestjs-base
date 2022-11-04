import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseWithData } from '../../common/entities/response.entity';
import { Constants } from '../../common/enums/constants.enum';
import { Response } from '../../common/response';
import logger from '../../utils/logger';
import { ArithmeticValidator } from './arithmetic.validator';
import { CreateArithmeticDto, OperationType } from './dto/create-arithmetic.dto';

@Injectable()
export class ArithmeticService {
  constructor(private readonly calculateValidator: ArithmeticValidator) {}
  async calculate(createArithmeticDto: CreateArithmeticDto): Promise<ResponseWithData> {
    try {
      // validate payload

      const validatePayload = await this.calculateValidator.validateCalculate(createArithmeticDto);

      if (validatePayload.status !== HttpStatus.OK) return validatePayload;

      const slackUsername = '@Rafique Adam Cujdoe';

      let result = null;

      // Calculate Addtion
      if (createArithmeticDto.operation_type === OperationType.addition)
        result = createArithmeticDto.x + createArithmeticDto.y;

      // Calculate Multiplication
      if (createArithmeticDto.operation_type === OperationType.multiplication)
        result = createArithmeticDto.x * createArithmeticDto.y;

      // Calculate Subtraction
      if (createArithmeticDto.operation_type === OperationType.subtraction)
        result = createArithmeticDto.x - createArithmeticDto.y;

      return Response.withData(HttpStatus.OK, 'Calculation Done', {
        slackUsername,
        result,
        operation_type: createArithmeticDto.operation_type,
      });
    } catch (error) {
      logger.error('An error occurred in Calculate method');
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }
}
