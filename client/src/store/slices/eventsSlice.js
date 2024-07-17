import { createSlice } from '@reduxjs/toolkit';

const EVENTS_SLICE_NAME = 'events';

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: EVENTS_SLICE_NAME,
  initialState,
  reducers: {
    getEvents: (state) => {
      const storageEvents = JSON.parse(localStorage.getItem('events'));
      state.events = storageEvents ?? [];
    },
    setEvents: (state) => {
      localStorage.setItem('events', JSON.stringify(state.events));
    },
    clearEvents: () => initialState,
    addEvent: (state, { payload }) => {
      payload.createdAt = new Date().toISOString();
      state.events = [...state.events, payload].sort(
        (a, b) => a.endTime - b.endTime
      );
    },
    deleteEvent: (state, { payload }) => {
      //Todo maybe rewrite with "uuid" in the future
      state.events = state.events.filter((e) => e.createdAt !== payload);
    },
  },
});

const { actions, reducer } = eventsSlice;

export const {
  getEvents,
  setEvents,
  addEvent,
  removeEvent,
  clearEvents,
  deleteEvent,
} = actions;

export default reducer;
