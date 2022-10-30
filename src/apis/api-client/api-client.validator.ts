import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseWithoutData } from '../../common/entities/response.entity';
import { JoiValidator } from '../../utils/joi.validator';
import { Response } from '../../common/response';
import { ApiClientRepository } from './api-client.repository';
import { ApiClientRequestDto } from './dto/api-client.dto';
import * as joi from 'joi';

@Injectable()
export class ApiClientValidator {
  constructor(private readonly _apiClientRepository: ApiClientRepository) {}

  validateSave(params: ApiClientRequestDto): Promise<ResponseWithoutData> {
    return new Promise(async (resolve, reject) => {
      try {
        // joi validation
        const joiSchema = joi.object({
          clientName: joi.string().required().label('Name of client'),
        });
        const joiValidationResults = JoiValidator.validate(joiSchema, params);

        // check the results from joi validation
        if (joiValidationResults) return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, joiValidationResults));

        // check for duplicate api clients
        const foundClient = await this._apiClientRepository.retrieveClientByFilter({ clientName: params.clientName });
        if (foundClient)
          return resolve(Response.withoutData(HttpStatus.CONFLICT, 'A key has already been generated for this client'));

        // success
        resolve(Response.withoutData(HttpStatus.OK, 'Passed'));
      } catch (error) {
        reject(error);
      }
    });
  }
}
