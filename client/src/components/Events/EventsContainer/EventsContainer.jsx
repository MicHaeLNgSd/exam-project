import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EventsHelper from '../EventsHelper/EventsHelper';
import { getEvents, setEvents } from '../../../store/slices/eventsSlice';

const EventsContainer = ({ data, dispatch }) => {
  useEffect(() => {
    dispatch(getEvents());
    return () => {
      dispatch(setEvents());
    };
  }, [data, dispatch]);

  if (!data) return null;
  return <EventsHelper />;
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  return { data };
};

export default connect(mapStateToProps, null)(EventsContainer);
