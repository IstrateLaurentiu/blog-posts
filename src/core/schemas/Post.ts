import { ModelDefinition } from '@nestjs/mongoose';
import mongoose, { Schema, Model } from 'mongoose';
import { DbModels, Post } from '../types';

const PostSchema: Schema<Post> = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  viewsCounter: {
    type: Number,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: DbModels.USER,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export const PostModel: ModelDefinition = {
  name: DbModels.POSTS,
  schema: PostSchema,
};
