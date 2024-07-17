import React from 'react';
import { RxLapTimer } from 'react-icons/rx';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EventsSection.module.sass';
import { clearEvents, setEvents } from '../../../store/slices/eventsSlice';
import EventsList from '../../../components/Events/EventsList/EventsList';

function EventsSection({ className }) {
  const events = useSelector((state) => state.eventsStore.events);
  const dispatch = useDispatch();
  const clickHandler = () => {
    confirmAlert({
      title: 'Confirm to clear',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(clearEvents());
            dispatch(setEvents());
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <section className={className}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.timerHeader}>Live upcomming checks</h2>
        <div className={styles.timerTimeWrapper}>
          <h3 className={styles.timerTimeHeader}>Remaining time</h3>
          <RxLapTimer className={styles.timerIcon} />
        </div>
      </div>

      <EventsList events={events} />

      <div className={styles.btnWrapper}>
        <button
          className={styles.btn}
          onClick={clickHandler}
          disabled={!events.length}
        >
          Close All
        </button>
      </div>
    </section>
  );
}

export default EventsSection;
