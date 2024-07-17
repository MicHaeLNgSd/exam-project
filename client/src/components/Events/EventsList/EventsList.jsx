import React from 'react';
import styles from './EventsList.module.sass';
import EventTimer from './../EventTimer/EventTimer';

function EventsList({ events }) {
  const isEventsEmpty = !events?.length;
  if (isEventsEmpty) {
    return (
      <p className={styles.emptyEventsString}>There is any events right now</p>
    );
  }

  return (
    <ul className={styles.timersList}>
      {events.map((e, i) => (
        <li key={i} className={styles.timersItem}>
          <EventTimer event={e} />
        </li>
      ))}
    </ul>
  );
}

export default EventsList;
