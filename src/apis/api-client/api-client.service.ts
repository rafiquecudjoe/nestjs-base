import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiClientRequestDto } from './dto/api-client.dto';
import { Chance } from 'chance';
import * as bcrypt from 'bcrypt';
import logger from '../../utils/logger';
import { ApiClientValidator } from './api-client.validator';
import { Response } from '../../common/response';
import { ApiClientRepository } from './api-client.repository';
import { ResponseWithData } from '../../common/entities/response.entity';
import { Constants } from '../../common/enums/constants.enum';

@Injectable()
export class ApiClientService {
  constructor(
    private readonly _apiClientvalidator: ApiClientValidator,
    private readonly _apiClientRepository: ApiClientRepository
  ) {}

  async createClient(params: ApiClientRequestDto): Promise<ResponseWithData> {
    try {
      // validate payload
      const validationResults = await this._apiClientvalidator.validateSave(params);
      if (validationResults.status !== HttpStatus.OK) return validationResults;

      // generate client key and secret
      const chance = new Chance();
      const clientKey: string = chance.hash({ length: 10 });
      const clientSecret: string = chance.string({ length: 25 });

      // hash client secret
      const saltRounds: number = 10;
      const hashedClientSecret: string = await bcrypt.hash(clientSecret, saltRounds);

      // save client
      await this._apiClientRepository.saveClient({
        clientName: params.clientName,
        clientKey,
        clientSecret: hashedClientSecret,
      });

      // success
      return Response.withData(HttpStatus.CREATED, Constants.SUCCESS_MESSAGE, {
        clientKey,
        clientSecret,
      });
    } catch (error) {
      logger.error(`An error occurred while creating API client: ${error}`);
      return Response.withoutData(HttpStatus.INTERNAL_SERVER_ERROR, Constants.SERVER_ERROR);
    }
  }
}
