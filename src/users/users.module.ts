import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyUserMiddleware } from 'src/middleware/verifyUser';
import { UserModel } from '../core/schemas';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([UserModel])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyUserMiddleware)
      .forRoutes({ path: '/api/user/auth', method: RequestMethod.GET });
  }
}
