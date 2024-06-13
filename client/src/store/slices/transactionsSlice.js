import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';

const TRANSACTIONS_SLICE_NAME = 'transactions';

const initialState = {
  transactions: [],
  isFetching: false,
  error: null,
};

export const getUserTransactions = createAsyncThunk(
  `${TRANSACTIONS_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.getUserTransactions();
      return data;
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

const transactionsSlice = createSlice({
  name: TRANSACTIONS_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserTransactions.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUserTransactions.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.transactions = [...payload];
    });
    builder.addCase(getUserTransactions.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = transactionsSlice;
export default reducer;
