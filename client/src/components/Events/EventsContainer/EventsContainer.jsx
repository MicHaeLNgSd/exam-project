import React from 'react';
import { connect } from 'react-redux';
import EventsHelper from '../EventsHelper/EventsHelper';

const EventsContainer = ({ data }) => {
  if (!data) return null;
  return <EventsHelper />;
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  return { data };
};

export default connect(mapStateToProps, null)(EventsContainer);
