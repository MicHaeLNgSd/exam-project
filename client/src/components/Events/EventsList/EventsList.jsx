import React from 'react';
import styles from './EventsList.module.sass';
import EventTimer from './../EventTimer/EventTimer';

function EventsList({ events = [] }) {
  if (!events.length)
    return (
      <div className={styles.notEvents}>There is no event at the moment</div>
    );

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
