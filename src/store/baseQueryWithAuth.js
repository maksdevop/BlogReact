import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'https://blog-platform.kata.academy/api',
  prepareHeaders: (headers) => {
    let token;
    try {
      token = JSON.parse(localStorage.getItem('token'));
    } catch (e) {
      console.error('Invalid token format:', e);
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQueryWithAuth;
