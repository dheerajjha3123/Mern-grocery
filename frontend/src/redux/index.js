import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice';
import produtSlice from './productSlice';
import orderSlice from './orderSlice';

export const store = configureStore({
    reducer: {
        user : userSlice,
        product: produtSlice,
        orders :orderSlice
    },
  });