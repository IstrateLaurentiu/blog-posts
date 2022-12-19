import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DbModels, User } from 'src/core/types';
import { CreateUserDto, LoginUserDTO } from '../DTOs';
import { UserRepository } from '../repositories';
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

@Injectable()
export class UserService {
  private readonly userRepository: UserRepository;

  constructor(
    @InjectModel(DbModels.USER) private readonly userModel: Model<User>,
  ) {
    this.userRepository = new UserRepository(userModel);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOneByCondition(
      { _id: id },
      '-password',
    );
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneByCondition({ email });
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bycrypt.genSalt(10);
    const saltedPassword = await bycrypt.hash(createUserDto.password, salt);

    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: saltedPassword,
    });
    return newUser;
  }

  async login(loginUserDto: LoginUserDTO) {
    const user = await this.getUserByEmail(loginUserDto.email);
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }
    const isMatch = await bycrypt.compare(loginUserDto.password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', 400);
    }

    const tokenPayload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: 3600,
    });

    delete user.password;

    return { user, token };
  }
}
