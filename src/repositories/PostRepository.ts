import { Post } from '../core/types';
import { BaseRepository } from './BaseRepository';

export class PostRepository extends BaseRepository<Post> {
  async findAll(): Promise<Post[]> {
    return this._collection.find().populate('createdBy', 'fullname');
  }

  async findOne(id: string, selectOption?: string): Promise<Post> {
    const result = await this._collection
      .findOne({ _id: id })
      .select(selectOption)
      .populate('createdBy', 'fullname');
    return result as Post;
  }

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
