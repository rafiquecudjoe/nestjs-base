import { SaveClientParams, FilterOptions } from '../entities/api-client.entity';

export interface IApiClientRepository {
  saveClient(params: SaveClientParams): Promise<any>;
  retrieveClientByFilter(filters: FilterOptions): Promise<any>;
}
