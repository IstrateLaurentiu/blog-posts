import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpException,
  HttpStatus,
  HttpCode,
  Get,
  Request,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDTO } from 'src/DTOs';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UserService } from './users.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    this.userService.createUser(createUserDto);
  }

  @Post('auth')
  @HttpCode(200)
  @UseFilters(HttpExceptionFilter)
  async login(@Body() loginUserDto: LoginUserDTO) {
    const loginInfo = await this.userService.login(loginUserDto);
    return loginInfo;
  }

  @Get('auth')
  @UseFilters(HttpExceptionFilter)
  async getUser(@Request() req) {
    const user = await this.userService.getUserById(req.user?.id);
    if (!user) {
      throw new HttpException('No user found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
