import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from './baseQueryWithAuth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit = 10, offset = 0 }) => `/articles?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [...result.articles.map(({ slug }) => ({ type: 'Article', id: slug })), 'Article']
          : ['Article'],
    }),
    createArticle: builder.mutation({
      query: (newArticle) => ({
        url: '/articles',
        method: 'POST',
        body: { article: newArticle },
      }),
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
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     const token = data.user.token;
      //     if (typeof token === 'string') {
      //       localStorage.setItem('token', JSON.stringify(token));
      //     } else {
      //       console.error('Invalid token format:', token);
      //     }
      //   } catch (error) {
      //     console.error('Error storing token:', error);
      //   }
      // },
    }),
    deleteArticle: builder.mutation({
      query: (articleSlug) => ({
        url: `/articles/${articleSlug}`,
        method: 'DELETE',
      }),
    }),
    updateArticle: builder.mutation({
      query: ({ slug, updatedArticle }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: { article: updatedArticle },
      }),
    }),
    toggleLike: builder.mutation({
      query: ({ slug, isLiked }) => ({
        url: `/articles/${slug}/favorite`,
        method: isLiked ? 'DELETE' : 'POST', // Убираем лайк или добавляем лайк
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: 'Article', id: slug }],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useCreateArticleMutation,
  useCreateUserMutation,
  useLoginUserMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useToggleLikeMutation,
} = apiSlice;
