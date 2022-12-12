import { Post } from '../core/types';
import { BaseRepository } from './BaseRepository';

export class PostRepository extends BaseRepository<Post> {
  async increaseViewsNumber(postId) {
    return this._collection.updateOne(
      {
        _id: postId,
      },
      {
        $inc: { viewsCounter: 1 },
      },
    );
  }
}
