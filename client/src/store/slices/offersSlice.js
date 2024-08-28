import { createSlice } from '@reduxjs/toolkit';
import { getOffers as getOffersData } from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';
import * as restController from '../../api/rest/restController';
import { toast } from 'react-toastify';
import CONSTANTS from '../../constants';

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

export const setOfferReviewStatus = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/setOfferReviewStatus`,
  thunk: async (payload, { dispatch }) => {
    const { data } = await restController.setOfferReviewStatus(payload);
    if (data?.isReloadRequired) {
      if (data?.message) toast(data?.message);
      dispatch(clearOffers());
      dispatch(
        getOffers({
          limit: 8,
          status: CONSTANTS.OFFER_STATUS.REVIEWING,
        })
      );
    }
    return data;
  },
});

const reducers = {
  clearOffers: (state) => {
    state.error = null;
    state.offers = [];
  },
  deleteOffer: (state, { payload }) => {
    state.offers = state.offers.filter((o) => o.id !== payload.id);
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

  //setOfferReviewStatus
  builder.addCase(setOfferReviewStatus.pending, (state) => {
    state.error = null;
  });
  builder.addCase(setOfferReviewStatus.fulfilled, (state, { payload }) => {
    const { id, status } = payload;
    state.offers = state.offers.map((o) => {
      if (o.id === id) o.status = status;
      return o;
    });
  });
  builder.addCase(setOfferReviewStatus.rejected, (state, { payload }) => {
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
export const { clearOffers, deleteOffer } = actions;
export default reducer;
