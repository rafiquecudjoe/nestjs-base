import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import axios from 'axios';
import { config } from '../../config/config';
import logger from '../../utils/logger';
import { Constants } from '../enums/constants.enum';

@Injectable()
export class IsUser implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {
    try {
      // check if the request came with an authorization header
      if (!req.headers['authorization']) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'No user token submitted',
        });
      }

      // retrieve the token to be used to authenticate the user
      // authenticate user from Nellys coin
      const bearerToken = req.headers['authorization'];
      let responseData: any;
      try {
        const response = await axios.post(
          `${config.nellysCoinServer}/api/v1/auth/authenticate-user`,
          {},
          {
            headers: {
              'client-id': config.nellysCoinClientId,
              'api-key': config.nellysCoinClientSecret,
              authorization: bearerToken,
            },
          }
        );

        responseData = response.data;

        // checking if user was found
        if (!responseData || Object.keys(responseData).length === 0) {
          return res.status(HttpStatus.UNAUTHORIZED).send({
            message: 'You are not authorized to perform this action',
          });
        }
      } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'You are not authorized to perform this action' });
      }

      // attach user to the request object
      req.user = responseData.data;

      // success
      next();
    } catch (error) {
      logger.error(`An error occurred while authenticating user: ${error}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: Constants.SERVER_ERROR });
    }
  }
}
