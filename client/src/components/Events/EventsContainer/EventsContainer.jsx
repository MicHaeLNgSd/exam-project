import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EventsHelper from '../EventsHelper/EventsHelper';
import { getEvents, setEvents } from '../../../store/slices/eventsSlice';
import CONSTANTS from '../../../constants';
const { CREATOR, CUSTOMER, MODERATOR } = CONSTANTS;

const allRoles = [CUSTOMER, CREATOR, MODERATOR];

const EventsContainer = ({ roles = allRoles, data, dispatch }) => {
  useEffect(() => {
    dispatch(getEvents());
    return () => {
      dispatch(setEvents());
    };
  }, [data, dispatch]);

  if (!data || !roles.includes(data?.role)) return null;
  return <EventsHelper />;
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  return { data };
};

export default connect(mapStateToProps, null)(EventsContainer);
