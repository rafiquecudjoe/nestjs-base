import { Controller, Post, Body, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseWithData, ResponseWithoutData } from '../../common/entities/response.entity';
import { ArithmeticService } from './arithmetic.service';
import { CreateArithmeticDto } from './dto/create-arithmetic.dto';

@ApiTags('Arithmetic')
@Controller('/api/v1')
export class ArithmeticController {
  constructor(private readonly arithmeticService: ArithmeticService) {}

  @Post('/arithmetic')
  @ApiOperation({
    summary: 'Used to make arithmetic calculations',
  })
  @ApiCreatedResponse({ description: 'Request completed', type: ResponseWithData })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: ResponseWithoutData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async create(@Body() createArithmeticDto: CreateArithmeticDto, @Res() res: Response) {
    const response: ResponseWithData = await this.arithmeticService.calculate(createArithmeticDto);

    if (response.data) return res.status(response.status).send(response.data);

    return res.status(response.status).json({
      message: response.message,
    });
  }
}
