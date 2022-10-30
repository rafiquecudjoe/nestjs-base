import { Module } from '@nestjs/common';
import { ApiClientService } from './api-client.service';
import { ApiClientController } from './api-client.controller';
import { ApiClientValidator } from './api-client.validator';
import { ApiClientRepository } from './api-client.repository';

@Module({
  controllers: [ApiClientController],
  providers: [ApiClientService, ApiClientValidator, ApiClientRepository],
  exports: [ApiClientRepository],
})
export class ApiClientModule {}
