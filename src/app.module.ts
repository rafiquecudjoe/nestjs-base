import { MiddlewareConsumer, Module, } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiClientModule } from './apis/api-client/api-client.module';
import { ConfigModule } from '@nestjs/config';

import { IsAdmin } from './common/middlewares/is-admin';
import { IsUser } from './common/middlewares/is-user';
// import { IsClient } from './common/middlewares/is-client';
import { ArithmeticModule } from './apis/arithmetic/arithmetic.module';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule.forRoot(), ApiClientModule, ArithmeticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(IsClient)
      // .exclude({ path: '/api/v1/api-clients', method: RequestMethod.POST }, { path: '/', method: RequestMethod.GET })
      // .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer.apply(IsAdmin);
    // .forRoutes(
    //   { path: '*', method: RequestMethod.ALL }
    // );

    consumer.apply(IsUser);
    // .forRoutes(
    //   { path: '*', method: RequestMethod.ALL }
    // );
  }
}
