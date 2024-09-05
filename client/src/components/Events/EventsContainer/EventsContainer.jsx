import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventsHelper from '../EventsHelper/EventsHelper';
import { getEvents, setEvents } from '../../../store/slices/eventsSlice';
import CONSTANTS from '../../../constants';

const allRoles = Object.values(CONSTANTS.USER_ROLE);

const EventsContainer = ({ roles = allRoles }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userStore);

  useEffect(() => {
    dispatch(getEvents());
    return () => {
      dispatch(setEvents());
    };
  }, [dispatch]);

  if (!data || !roles.includes(data?.role)) return null;
  return <EventsHelper />;
};

export default EventsContainer;
