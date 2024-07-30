import { createSlice } from '@reduxjs/toolkit';
import { getOffers as getOffersData } from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';

const OFFERS_SLICE_NAME = 'offers';

const initialState = {
  isFetching: true,
  offers: [],
  error: null,
  haveMore: true,
};

export const getOffers = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/getOffers`,
  thunk: async (reqData) => {
    const { data } = await getOffersData(reqData);
    return data;
  },
});

export const setOfferStatus = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/setOfferStatus`,
  thunk: async (payload) => {
    const { data } = await setOfferStatus(payload);
    return data;
  },
});

const reducers = {
  clearOffers: (state) => {
    state.error = null;
    state.offers = [];
  },
};

const extraReducers = (builder) => {
  //getOffers
  builder.addCase(getOffers.pending, pendingReducer);
  builder.addCase(getOffers.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.offers = [...state.offers, ...payload.offers];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getOffers.rejected, rejectedReducer);

  //setOfferStatus
  builder.addCase(setOfferStatus.pending, (state) => {
    state.error = null;
  });
  builder.addCase(setOfferStatus.fulfilled, (state, { payload }) => {
    state.offers = state.offers.map((o) => {
      const { id, status } = payload;
      if (o.id === id) o.status = status;
      return o;
    });
  });
  builder.addCase(setOfferStatus.rejected, (state, { payload }) => {
    state.error = payload;
  });
};

const offersSlice = createSlice({
  name: OFFERS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = offersSlice;
export const { clearOffers } = actions;
export default reducer;
