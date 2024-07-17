import React, { useEffect, useState } from 'react';
import moment from 'moment'; //TODO change to date-fns but everywhere
import _ from 'lodash';
import { IoClose } from 'react-icons/io5';
import styles from './EventTimer.module.sass';
import { useDispatch } from 'react-redux';
import { deleteEvent, setEvents } from '../../../store/slices/eventsSlice';

function EventTimer({ event }) {
  const { text, endTime, createdAt, reminderTime } = event;

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteEvent(createdAt));
    dispatch(setEvents());
  };

  const [now, setNow] = useState(moment());

  const remainTime = moment(endTime).diff(now);
  const fullTime = moment(endTime).diff(moment(createdAt));
  const timeBeforeRemind = moment(reminderTime).diff(now);

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

  if (timeBeforeRemind <= 0 || remainTime <= 0) {
    const readyColor = '#FCDECD';
    const endColor = '#F8CFCF';
    const timerColor = remainTime <= 0 ? endColor : readyColor;
    progressStyle.backgroundColor = timerColor; //TODO spam
  }

  return (
    <div className={styles.timer}>
      <div className={styles.progress} style={progressStyle}></div>
      <div className={styles.info}>
        <p>{text}</p>
        <p className={styles.timeInfo}>{formatDuration(remainTime)}</p>
      </div>
      <button className={styles.closeBtn} onClick={handleClick}>
        <IoClose className={styles.closeIcon} />
      </button>
    </div>
  );
}

export default EventTimer;
