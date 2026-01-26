import { combineSlices } from '@reduxjs/toolkit';
import ingredientsSlice from './ingredientsSlice';
import orderSlice from './orderSlice';
import feedSlice from './feedSlice';
import userSlice from './userSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  orderSlice,
  feedSlice,
  userSlice
);
