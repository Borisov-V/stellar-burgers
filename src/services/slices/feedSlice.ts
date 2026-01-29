import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const getFeeds = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось загрузить ленту заказов';
      })
      .addCase(
        getFeeds.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: TOrder[];
            total: number;
            totalToday: number;
          }>
        ) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось загрузить заказ';
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<{ orders: TOrder[] }>) => {
          state.loading = false;
          const order = action.payload.orders[0];
          if (
            order &&
            !state.orders.find((item) => item.number === order.number)
          ) {
            state.orders.push(order);
          }
        }
      );
  }
});

export default feedSlice;
