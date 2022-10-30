import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import prisma from '../prisma';
import { Constants } from '../enums/constants.enum';
import logger from '../../utils/logger';

@Injectable()
export class IsClient implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // check if the request came with a client key
      if (!req.headers['client-key']) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'No client key submitted',
        });
      }

      // check if the request came with a client secret
      if (!req.headers['client-secret']) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'No client secret submitted',
        });
      }

      // if the request came with a key and secret, check if they are valid
      const clientKey = <string>req.headers['client-key'];
      const clientSecret = <string>req.headers['client-key'];
      const foundClient = await prisma.apiClient.findFirst({
        where: { clientKey },
      });

      // check if client key is correct
      if (!foundClient) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'Invalid client key',
        });
      }

      // check to make sure the client secret submitted is valid
      const response = await bcrypt.compare(clientSecret, foundClient.clientSecret);
      if (!response) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'Invalid client secret',
        });
      }

      // success
      next();
    } catch (error) {
      logger.error(`An error occurred while authenticating client: ${error}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: Constants.SERVER_ERROR });
    }
  }
}
