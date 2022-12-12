import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyUserMiddleware } from '../middleware/verifyUser';
import { PostModel } from '../core/schemas';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';

@Module({
  imports: [MongooseModule.forFeature([PostModel])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyUserMiddleware)
      .forRoutes({ path: '/api/post*', method: RequestMethod.ALL });
  }
}
