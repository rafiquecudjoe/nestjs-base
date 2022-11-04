import { HttpStatus } from '@nestjs/common';
import * as joi from 'joi';
import { ResponseWithoutData } from "src/common/entities/response.entity";
import { Response } from 'src/common/response';
import { JoiValidator } from 'src/utils/joi.validator';
import { CreateArithmeticDto } from "./dto/create-arithmetic.dto";

export class ArithmeticValidator {
    async validateCalculate(createArithmeticDto: CreateArithmeticDto): Promise<ResponseWithoutData>{
        return new Promise(async (resolve, reject) => {
            try {

                const schema = joi.object({
                    operation_type: joi.any().required(),
                    x: joi.number().required(),
                    y: joi.number().required()
                })

                const joiValidationResults = JoiValidator.validate(schema, createArithmeticDto)

                if (joiValidationResults) return resolve(Response.withoutData(HttpStatus.BAD_REQUEST, joiValidationResults))
                
                // success

                return resolve(Response.withoutData(HttpStatus.OK,"Passed"))

            } catch (error) {
                reject(error)
            }
        })
   
   }
}