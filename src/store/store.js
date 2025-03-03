import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import registrationReducer from './registrationSliсe';
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    registration: registrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
