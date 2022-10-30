import { Injectable } from '@nestjs/common';
import { ApiClient } from '@prisma/client';
import prisma from '../../common/prisma';
import { FilterOptions, SaveClientParams } from './entities/api-client.entity';
import { IApiClientRepository } from './interfaces/api-client.interface';

@Injectable()
export class ApiClientRepository implements IApiClientRepository {
  saveClient(params: SaveClientParams): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        // save client
        await prisma.apiClient.create({
          data: {
            clientName: params.clientName,
            clientKey: params.clientKey,
            clientSecret: params.clientSecret,
          },
        });

        // success
        resolve('saved');
      } catch (error) {
        reject(error);
      }
    });
  }

  retrieveClientByFilter(filters: FilterOptions): Promise<ApiClient | null> {
    return new Promise(async (resolve, reject) => {
      try {
        // retrieve client
        const foundClient = await prisma.apiClient.findFirst({
          where: { ...filters },
        });

        // success
        resolve(foundClient);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteAll(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await prisma.apiClient.deleteMany({});

        // success
        resolve('success');
      } catch (error) {
        reject(error);
      }
    });
  }
}
