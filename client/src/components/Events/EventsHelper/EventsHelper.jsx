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
    const timerId = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const isReminded = (e) => moment(e?.reminderTime).isBefore(now);
  const isFinished = (e) => moment(e?.endTime).isBefore(now);

  let remindAmount = 0;
  let finishAmount = 0;
  events.forEach((e) => {
    if (isFinished(e)) finishAmount++;
    else if (isReminded(e)) remindAmount++;
  });

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
