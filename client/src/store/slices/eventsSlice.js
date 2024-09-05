import { createSlice } from '@reduxjs/toolkit';
import {
  decorateAsyncThunk,
  fulfilledReducer,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';

const EVENTS_SLICE_NAME = 'events';

const initialState = {
  events: [],
  isFetching: false,
  error: null,
};

export const getEvents = decorateAsyncThunk({
  key: `${EVENTS_SLICE_NAME}/getEvents`,
  thunk: async () => {
    const storageEvents = JSON.parse(localStorage.getItem('events'));
    return storageEvents;
  },
});

export const setEvents = decorateAsyncThunk({
  key: `${EVENTS_SLICE_NAME}/setEvents`,
  thunk: async (_, { getState }) => {
    const { events } = getState().eventsStore;
    localStorage.setItem('events', JSON.stringify(events));
  },
});

const extraReducers = (builder) => {
  builder.addCase(getEvents.pending, pendingReducer);
  builder.addCase(getEvents.fulfilled, (state, { payload }) => {
    state.events = payload ?? [];
  });
  builder.addCase(getEvents.rejected, rejectedReducer);

  builder.addCase(setEvents.pending, pendingReducer);
  builder.addCase(setEvents.fulfilled, fulfilledReducer);
  builder.addCase(setEvents.rejected, rejectedReducer);
};

const eventsSlice = createSlice({
  name: EVENTS_SLICE_NAME,
  initialState,
  reducers: {
    clearEvents: () => initialState,
    addEvent: (state, { payload }) => {
      payload.createdAt = new Date().toISOString();
      const sortedEvents = [...state.events, payload].sort(
        (a, b) => new Date(a.endTime) - new Date(b.endTime)
      );
      state.events = sortedEvents;
    },
    deleteEvent: (state, { payload }) => {
      state.events = state.events.filter((e) => e.createdAt !== payload);
    },
  },
  extraReducers,
});

const { actions, reducer } = eventsSlice;

export const { addEvent, removeEvent, clearEvents, deleteEvent } = actions;

export default reducer;
