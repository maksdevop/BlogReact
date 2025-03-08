import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from './baseQueryWithAuth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Article', 'User'], // Добавляем 'User' для операций с пользователями
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit = 10, offset = 0 }) => `/articles?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result?.articles
          ? [
              ...result.articles.map(({ slug }) => ({ type: 'Article', id: slug })),
              { type: 'Article', id: 'LIST' },
            ]
          : [{ type: 'Article', id: 'LIST' }],
    }),
    getArticleBySlug: builder.query({
      query: (slug) => `/articles/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Article', id: slug }],
    }),
    createArticle: builder.mutation({
      query: (newArticle) => ({
        url: '/articles',
        method: 'POST',
        body: { article: newArticle },
      }),
      invalidatesTags: [{ type: 'Article', id: 'LIST' }],
    }),
    updateArticle: builder.mutation({
      query: ({ slug, updatedArticle }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: { article: updatedArticle },
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Article', id: slug },
        { type: 'Article', id: 'LIST' },
      ],
    }),
    deleteArticle: builder.mutation({
      query: (articleSlug) => ({
        url: `/articles/${articleSlug}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, articleSlug) => [
        { type: 'Article', id: articleSlug },
        { type: 'Article', id: 'LIST' },
      ],
    }),
    toggleLike: builder.mutation({
      query: ({ slug, isLiked }) => ({
        url: `/articles/${slug}/favorite`,
        method: isLiked ? 'DELETE' : 'POST',
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Article', id: slug },
        { type: 'Article', id: 'LIST' },
      ],
    }),

    // Эндпоинт для создания пользователя
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: { user: newUser },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }], // При необходимости можно обновить теги
    }),

    // Эндпоинт для входа пользователя
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: '/users/login',
        method: 'POST',
        body: { user: userCredentials },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }], // Аналогично, обновляем теги при необходимости
    }),
  }),
});

// Экспорт всех хуков
export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useToggleLikeMutation,
  useCreateUserMutation, // Хук для регистрации пользователя
  useLoginUserMutation, // Хук для входа пользователя
} = apiSlice;
