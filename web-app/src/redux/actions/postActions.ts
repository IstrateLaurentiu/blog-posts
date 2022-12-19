import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../services/http';

const backendURL = './api';

export const getAllPosts = createAsyncThunk(
  'getAllPosts',
  async (s, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`${backendURL}/post/all`);

      return data;
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const createPost = createAsyncThunk(
  'createPost',
  async (createPostDTO, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await http.post(
        `${backendURL}/post`,
        createPostDTO,
        config,
      );
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getPostById = createAsyncThunk(
  'getPostById',
  async (postId, { rejectWithValue, getState }) => {
    const state: any = getState();
    const currentPost = state.posts?.items.find(
      (post: any) => post._id === postId,
    );

    if (currentPost) {
      await http.post(`${backendURL}/post/${postId}/view`, {});
      return { currentPost, exists: true };
    }
    try {
      const { data } = await http.get(`${backendURL}/post/${postId}`);
      return {
        currentPost: data,
        exists: false,
      };
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
