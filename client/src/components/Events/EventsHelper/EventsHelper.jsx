import React from 'react';
import styles from './EventsHelper.module.sass';
import { RxLapTimer } from 'react-icons/rx';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function EventsHelper({ remindAmount = 10, finishAmount = 10 }) {
  return (
    <div className={styles.eventsHelper}>
      <Link to={'/events'} className={styles.eventsLink}>
        <div className={styles.remindAmount}>{remindAmount}</div>
        <div className={styles.finishAmount}>{finishAmount}</div>
        <RxLapTimer className={styles.timerIcon} />
      </Link>
    </div>
  );
}

export default EventsHelper;
