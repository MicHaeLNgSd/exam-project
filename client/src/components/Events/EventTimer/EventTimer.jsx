import React, { useEffect, useState } from 'react';
import styles from './EventTimer.module.sass';
import moment from 'moment';
import _ from 'lodash';

function EventTimer({ endTime, createdAt }) {
  endTime = moment('2024-07-09T19:44:00+03:00');
  createdAt = moment('2024-07-08T19:00:00+03:00');

  const remainTime = moment(endTime - moment());
  const fullTime = moment(endTime - createdAt);
  // const remainTime = endTime.diff(now);
  // const fullTime = endTime.diff(createdAt);

  const [timeLeft, setTimeLeft] = useState(remainTime);
  const progressPercentage = _.round((1 - remainTime / fullTime) * 100, 2);

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
    const secs = duration.seconds();

    let str = '';
    str += years ? `${years}y ` : '';
    str += days ? `${days}d ` : '';
    str += hours ? `${hours}h ` : '';
    str += minutes ? `${minutes}m ` : '';
    str += secs ? `${secs}s` : '0s';
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
