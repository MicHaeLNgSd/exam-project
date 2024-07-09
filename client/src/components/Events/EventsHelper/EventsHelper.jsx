import React from 'react';
import styles from './EventsHelper.module.sass';
import { RxLapTimer } from 'react-icons/rx';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function EventsHelper() {
  return (
    <div className={styles.eventsHelper}>
      <Link to={'/events'} className={styles.eventsLink}>
        <RxLapTimer className={styles.timerIcon} />
      </Link>
    </div>
  );
}

export default EventsHelper;
