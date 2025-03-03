import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api',
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit = 10, offset = 0 }) =>
        `/articles?limit=${limit}&offset=${offset}`,
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: '/users/login',
        method: 'POST',
        body: { user: userCredentials },
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useCreateUserMutation,
  useLoginUserMutation,
} = apiSlice;
