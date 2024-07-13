import React, { useEffect, useState } from 'react';
import styles from './EventTimer.module.sass';
import moment from 'moment';
import _ from 'lodash';

function EventTimer({ event }) {
  const { endTime, createdAt } = event;

  const remainTime = moment(endTime - moment()); //endTime.diff(now);
  const fullTime = moment(endTime - createdAt); //endTime.diff(createdAt);

  const [timeLeft, setTimeLeft] = useState(remainTime);
  const fullPercentage = _.round((1 - remainTime / fullTime) * 100, 2);
  const progressPercentage = fullPercentage > 100 ? 100 : fullPercentage;

  // console.log(moment(remainTime).format('Y[y]:D[d]:HH[h]:mm[m]:ss[s]'));

  useEffect(() => {
    if (timeLeft <= 0) return undefined;
    const timerId = setTimeout(() => {
      setTimeLeft(moment(endTime - moment()));
    }, 1000);
    return () => clearTimeout(timerId);
  }, [endTime, timeLeft]);

  //TODO redo (perfectly if with moment)
  const formatDuration = (time) => {
    const duration = moment.duration(time);
    if (duration <= 0) return '0s';

    const years = Math.floor(duration.asYears());
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    let str = '';
    if (years) str += `${years}y `;
    if (days) str += `${days}d `;
    if (hours) str += `${hours}h `;
    if (minutes) str += `${minutes}m `;
    str += `${seconds ?? 0}s`;

    return str;
  };

  const progressStyle = {
    width: `${progressPercentage}%`,
  };

  return (
    <div className={styles.timer}>
      <div className={styles.progress} style={progressStyle}></div>
      <div className={styles.info}>
        <p>EventTimer: {progressPercentage}%</p>
        <p className={styles.timeInfo}>{formatDuration(timeLeft)}</p>
      </div>

      {/* <progress max={fullTime} value={fullTime - timeLeft}>
        <p>text</p>
        <p>{formatDuration(timeLeft)}</p>
      </progress> */}
    </div>
  );
}

export default EventTimer;
