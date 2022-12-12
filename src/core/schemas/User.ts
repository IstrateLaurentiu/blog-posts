import { ModelDefinition } from '@nestjs/mongoose';
import mongoose, { Schema, Model } from 'mongoose';
import { User, DbModels } from '../types';

const UserSchema: Schema<User> = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel: ModelDefinition = {
  name: DbModels.USER,
  schema: UserSchema,
};
