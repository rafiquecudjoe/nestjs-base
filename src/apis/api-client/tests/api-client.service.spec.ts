import { Test, TestingModule } from '@nestjs/testing';
import { ResponseWithData } from '../../../common/entities/response.entity';
import { ApiClientService } from '../api-client.service';
import { ApiClientRepository } from '../api-client.repository';
import { ApiClientValidator } from '../api-client.validator';
import { Constants } from '../../../common/enums/constants.enum';

describe('Testing ApiClientService', () => {
  let service: ApiClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiClientService, ApiClientValidator, ApiClientRepository],
    }).compile();

    service = module.get<ApiClientService>(ApiClientService);
  });

  beforeAll(async () => {
    await new ApiClientRepository().deleteAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should check if client name is empty', async () => {
    const data: ResponseWithData = await service.createClient({ clientName: '' });

    expect(data.status).toEqual(400);
    expect(data.message).toEqual('Name of client is not allowed to be empty');
  });

  it('should save client details successfully', async () => {
    const data: ResponseWithData = await service.createClient({ clientName: 'test' });

    expect(data.status).toEqual(201);
    expect(data.message).toEqual(Constants.SUCCESS_MESSAGE);
    expect(data.data!.clientKey).toBeDefined();
    expect(data.data!.clientSecret).toBeDefined();
  });

  it('should not generate duplicate key for one client', async () => {
    const data: ResponseWithData = await service.createClient({ clientName: 'test' });

    expect(data.status).toEqual(409);
    expect(data.message).toEqual('A key has already been generated for this client');
  });
});
