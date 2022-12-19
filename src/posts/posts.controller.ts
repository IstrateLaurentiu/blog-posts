import {
  Controller,
  Post,
  Body,
  UseFilters,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
  Request,
  HttpCode,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from 'src/DTOs';
import { HttpExceptionFilter } from 'src/users/filters/http-exception.filter';
import { PostService } from './posts.service';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postService.createPost(createPostDto);
    return post;
  }

  @Get('all')
  async getAllPosts() {
    const posts = await this.postService.getAllPosts();
    return posts;
  }

  @Get('me')
  async getMyPosts(@Request() req) {
    const posts = await this.postService.getPostsByUserId(req.user?.id);
    return posts;
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async getPostById(@Param('id') id: string) {
    const post = await this.postService.getPostById(id);

    if (!post) {
      throw new HttpException(
        'There is no user with this id',
        HttpStatus.BAD_REQUEST,
      );
    }
    return post;
  }

  @Post(':id/view')
  @HttpCode(200)
  async registerPostView(@Param('id') id: string) {
    const post = await this.postService.registerView(id);

    return post;
  }

  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postService.updatePost(id, updatePostDto);
    return post;
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
    return 'Successfully deleted';
  }
}
