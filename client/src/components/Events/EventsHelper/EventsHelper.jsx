import React, { useEffect, useState } from 'react';
import styles from './EventsHelper.module.sass';
import { RxLapTimer } from 'react-icons/rx';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import moment from 'moment';

function EventsHelper() {
  const events = useSelector((state) => state.eventsStore.events);
  const [now, setNow] = useState(moment());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //* .isBefore(now) === .diff(now) < 0
  //TODO rewrite with state form store that changes by ++ --
  const remindAmount = events.filter(
    (e) =>
      moment(e.reminderTime).isBefore(now) && moment(e.endTime).isAfter(now)
  ).length;
  const finishAmount = events.filter((e) =>
    moment(e.endTime).isBefore(now)
  ).length;

  return (
    <div className={styles.eventsHelper}>
      <Link to={'/events'} className={styles.eventsLink}>
        {!!remindAmount && (
          <div className={styles.remindAmount}>{remindAmount}</div>
        )}
        {!!finishAmount && (
          <div className={styles.finishAmount}>{finishAmount}</div>
        )}
        <RxLapTimer className={styles.timerIcon} />
      </Link>
    </div>
  );
}

export default EventsHelper;
