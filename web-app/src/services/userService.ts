import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/user',
    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const token = getState().user.userToken;
      if (token) {
        headers.set('authorization', `${token}`);
        return headers;
      }
    },
  }),
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: '/auth',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = userAPI;
