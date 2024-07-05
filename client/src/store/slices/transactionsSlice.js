import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';

const TRANSACTIONS_SLICE_NAME = 'transactions';

const initialState = {
  transactions: [],
  isFetching: false,
  error: null,
};

export const getUserTransactions = decorateAsyncThunk({
  key: `${TRANSACTIONS_SLICE_NAME}/get`,
  thunk: async () => {
    const { data } = await restController.getUserTransactions();
    return data;
  },
});

const transactionsSlice = createSlice({
  name: TRANSACTIONS_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserTransactions.pending, pendingReducer);
    builder.addCase(getUserTransactions.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.transactions = [...payload];
    });
    builder.addCase(getUserTransactions.rejected, rejectedReducer);
  },
});

const { reducer } = transactionsSlice;
export default reducer;
