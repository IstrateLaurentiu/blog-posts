// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { userAPI } from '../services/userService';
import userReducers from './reducers/userReducers';
import postsReducers from './reducers/postsReducer';

const store = configureStore({
  reducer: {
    user: userReducers,
    posts: postsReducers,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware),
});

export default store;
