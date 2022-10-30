import { Controller, Post, Body, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExcludeController,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseWithData, ResponseWithoutData } from '../../common/entities/response.entity';

import { ApiClientService } from './api-client.service';
import { ApiClientRequestDto } from './dto/api-client.dto';

@ApiTags('clients')
@ApiExcludeController()
@Controller('api/v1/api-clients')
export class ApiClientController {
  constructor(private readonly apiClientService: ApiClientService) {}

  @Post()
  @ApiOperation({
    summary:
      'Used to create an account(key and secret) for any external service that would want to consume any of the APIs within this microservice',
  })
  @ApiCreatedResponse({ description: 'Service account successfully created', type: ResponseWithData })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: ResponseWithoutData })
  @ApiConflictResponse({ description: 'Conflict: A service with same account name exists', type: ResponseWithoutData })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ResponseWithoutData })
  async create(@Body() requestBody: ApiClientRequestDto, @Res() res: Response) {
    const response: ResponseWithData = await this.apiClientService.createClient(requestBody);

    if (response.data) {
      return res.status(response.status).send({
        message: response.message,
        data: response.data,
      });
    }

    return res.status(response.status).send({
      message: response.message,
    });
  }
}
