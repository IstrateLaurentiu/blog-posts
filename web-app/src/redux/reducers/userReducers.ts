import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin } from '../actions/userActions';

// initialize userToken from local storage
const userToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const initialState = {
  loading: true,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token'); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // register user
    [registerUser.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
