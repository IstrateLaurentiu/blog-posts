import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../types';
import { createPost, getAllPosts, getPostById } from '../actions/postActions';

const initialState: {
  items: Array<any>;
  error: any;
  currentPost: any;
  getAllPostsStatus: RequestStatus;
  getCurrentPostStatus: RequestStatus;
  createPostStatus: RequestStatus;
} = {
  items: [],
  error: null,
  currentPost: null,
  getAllPostsStatus: RequestStatus.IDLE,
  getCurrentPostStatus: RequestStatus.IDLE,
  createPostStatus: RequestStatus.IDLE,
};

const authSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, { payload }) => {
      state.items.push(payload as any);
      state.currentPost = payload;
    },
  },
  extraReducers: {
    // get all posts
    [getAllPosts.pending.toString()]: (state) => {
      state.getAllPostsStatus = RequestStatus.PENDING;
      state.error = null;
    },
    [getAllPosts.fulfilled.toString()]: (state, { payload }) => {
      state.items = payload;
      state.getAllPostsStatus = RequestStatus.SUCCESSFUL;

      state.error = null;
    },
    [getAllPosts.rejected.toString()]: (state, { payload }) => {
      state.getAllPostsStatus = RequestStatus.ERROR;
      state.error = payload;
    },

    //create post

    [createPost.pending.toString()]: (state) => {
      state.createPostStatus = RequestStatus.PENDING;
      state.error = null;
    },
    [createPost.fulfilled.toString()]: (state, { payload }) => {
      state.items.push(payload);
      state.createPostStatus = RequestStatus.SUCCESSFUL;
      state.error = null;
    },
    [createPost.rejected.toString()]: (state, { payload }) => {
      state.createPostStatus = RequestStatus.ERROR;
      state.error = payload;
    },

    //get post by id
    [getPostById.pending.toString()]: (state) => {
      state.getCurrentPostStatus = RequestStatus.PENDING;
      state.error = null;
    },
    [getPostById.fulfilled.toString()]: (state, { payload }) => {
      if (!payload.exists) {
        state.items.push(payload.currentPost);
      }
      state.currentPost = payload.currentPost;
      state.getCurrentPostStatus = RequestStatus.SUCCESSFUL;
      state.error = null;
    },
    [getPostById.rejected.toString()]: (state, { payload }) => {
      state.getCurrentPostStatus = RequestStatus.ERROR;
      state.error = payload;
    },
  },
});

export const { addPost } = authSlice.actions;
export const selectAllPosts = (state: any) => state.posts;
export const selectPostById = (state: any, postId: string) =>
  state.posts.items.find((post: any) => post._id === postId);

export default authSlice.reducer;
