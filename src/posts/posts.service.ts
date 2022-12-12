import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DbModels, Post } from 'src/core/types';
import { CreatePostDto, UpdatePostDto } from '../DTOs';
import { PostRepository } from '../repositories';

@Injectable()
export class PostService {
  private readonly postRepository: PostRepository;

  constructor(
    @InjectModel(DbModels.POSTS) private readonly postModel: Model<Post>,
  ) {
    this.postRepository = new PostRepository(postModel);
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = await this.postRepository.create({
      ...createPostDto,
      viewsCounter: 0,
    });
    return newPost;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findOne(id);
    //don't think it's necessary to wait for the views counter increase in order to return the post;
    //it's enough to just trigger the increase intent
    this.postRepository.increaseViewsNumber(id);
    return post;
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const newPost = await this.postRepository.update(id, updatePostDto);
    return newPost;
  }

  async deletePost(id: string) {
    const newPost = await this.postRepository.delete(id);
    return newPost;
  }
}
