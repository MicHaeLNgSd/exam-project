import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { controller } from '../../api/ws/socketController';
import { changeEditModeOnUserProfile } from './userProfileSlice';
import { decorateAsyncThunk, rejectedReducer } from '../../utils/store';

const USER_SLICE_NAME = 'user';

const initialState = {
  isFetching: false,
  error: null,
  data: null,
};

export const getUser = decorateAsyncThunk({
  key: `${USER_SLICE_NAME}/getUser`,
  thunk: async (replace) => {
    const { data } = await restController.getUser();
    controller.subscribe(data.id);
    if (replace) {
      replace('/');
    }
    return data;
  },
});

export const updateUser = decorateAsyncThunk({
  key: `${USER_SLICE_NAME}/updateUser`,
  thunk: async (payload, { dispatch }) => {
    const { data } = await restController.updateUser(payload);
    dispatch(changeEditModeOnUserProfile(false));
    return data;
  },
});

const reducers = {
  clearUserStore: (state) => {
    controller.unsubscribe(state.data.id);
    state.error = null;
    state.data = null;
  },
  clearUserError: (state) => {
    state.error = null;
  },
};

const extraReducers = (builder) => {
  builder.addCase(getUser.pending, (state) => {
    state.isFetching = true;
    state.error = null;
    state.data = null;
  });
  builder.addCase(getUser.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.data = payload;
  });
  builder.addCase(getUser.rejected, rejectedReducer);

  builder.addCase(updateUser.fulfilled, (state, { payload }) => {
    state.data = { ...state.data, ...payload };
    state.error = null;
  });
  builder.addCase(updateUser.rejected, (state, { payload }) => {
    state.error = payload;
  });
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = userSlice;

export const { clearUserStore, clearUserError } = actions;

export default reducer;
