import React, { useEffect, useState } from 'react';
import styles from './EventTimer.module.sass';
import moment from 'moment';
import _ from 'lodash';

function EventTimer({ endTime, createdAt }) {
  endTime = moment('2024-07-9 20:20:30 +3');
  createdAt = moment('2024-07-8 19:00:00 +3');

  // const now = moment();
  const remainTime = moment(endTime - moment());
  const fullTime = moment(endTime - createdAt);
  // const remainTime = endTime.diff(now);
  // const fullTime = endTime.diff(createdAt);

  const [timeLeft, setTimeLeft] = useState(remainTime);

  const progressPercentage = _.round((1 - remainTime / fullTime) * 100, 2);

  // console.log(moment(remainTime).format('Y[y]:D[d]:HH[h]:mm[m]:ss[s]'));

  useEffect(() => {
    if (timeLeft <= 0) return null;
    const timerId = setInterval(
      () => setTimeLeft(moment(endTime - moment())),
      1000
    );
    return () => clearInterval(timerId);
  }, [endTime, timeLeft]);

  const formatDuration = (seconds) => {
    const duration = moment.duration(seconds);

    const years = Math.floor(duration.asYears());
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const secs = duration.seconds();

    let str = '';
    str += years ? `${years}y` : '';
    str += days ? `${days}d` : '';
    str += hours ? `${hours}h` : '';
    str += minutes ? `${minutes}m` : '';
    str += secs ? `${secs}s` : '';
    // console.log(duration);
    return str;
  };

  // console.group();
  // console.log(progressPercentage);
  // console.log(endTime);
  // console.log(createdAt);
  // // console.log('now', now);
  // console.log(formatDuration(remainTime));
  // console.log(fullTime);
  // console.groupEnd();

  const tryStyle = {
    backgroundColor: 'green',
    height: '5px',
    width: `${progressPercentage}%`,
  };

  return (
    <div className={styles.timer}>
      <div>
        <p>
          EventTimer: {progressPercentage}% {formatDuration(timeLeft)}
        </p>
        <div style={tryStyle}></div>
      </div>
    </div>
  );
}

export default EventTimer;
