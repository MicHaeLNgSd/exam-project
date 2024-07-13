import React, { useEffect, useState } from 'react';
import styles from './EventTimer.module.sass';
import moment from 'moment'; //TODO change to date-fns but everywhere
import _ from 'lodash';

function EventTimer({ event }) {
  const { text, endTime, createdAt, reminderTime } = event;

  const [now, setNow] = useState(moment());

  const remainTime = moment(endTime).diff(now);
  const fullTime = moment(endTime).diff(moment(createdAt));

  useEffect(() => {
    if (remainTime <= 0) return undefined;
    const timerId = setTimeout(() => {
      setNow(moment());
    }, 1000);
    return () => clearTimeout(timerId);
  }, [remainTime]);

  const fullPercentage = _.round((1 - remainTime / fullTime) * 100, 2);
  const progressPercentage = _.clamp(fullPercentage, 0, 100);
  // console.log(moment(remainTime).format('Y[y]:D[d]:HH[h]:mm[m]:ss[s]'));

  //TODO redo (perfectly if with moment itself)
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

  const timeBeforeRemind = moment(reminderTime).diff(moment());
  if (timeBeforeRemind <= 0) {
    // console.log(timeBeforeRemind);//TODO spam
    progressStyle.backgroundColor = 'orange';
  }

  if (remainTime <= 0) {
    // console.log(timeBeforeRemind);//TODO spam
    progressStyle.backgroundColor = 'red';
  }

  return (
    <div className={styles.timer}>
      <div className={styles.progress} style={progressStyle}></div>
      <div className={styles.info}>
        <p>
          {text} EventTimer: {progressPercentage}%
        </p>
        <p className={styles.timeInfo}>{formatDuration(remainTime)}</p>
      </div>
    </div>
  );
}

export default EventTimer;
