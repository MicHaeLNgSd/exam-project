import React from 'react';
import moment from 'moment';
import styles from './ContestBox.module.sass';
import CONSTANTS from '../../../constants';
const { CONTEST_STATUS, CONTEST_TYPE, STATIC_IMAGES_PATH } = CONSTANTS;

const ContestBox = (props) => {
  const getTimeStr = () => {
    const diff = moment.duration(moment().diff(moment(props.data.createdAt)));
    let str = '';
    if (diff._data.days !== 0) str = `${diff._data.days}d `;
    if (diff._data.hours !== 0) str += `${diff._data.hours}h`;
    if (str.length === 0) str = 'less than 1h';
    return str;
  };

  const getPreferenceContest = () => {
    const { data } = props;
    if (data.contestType === CONTEST_TYPE.NAME) return data.typeOfName;
    if (data.contestType === CONTEST_TYPE.LOGO) return data.brandStyle;
    return data.typeOfTagline;
  };

  const ucFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const getStatusName = (status) => {
    switch (status) {
      case CONTEST_STATUS.ACTIVE:
        return 'Going';
      case CONTEST_STATUS.PENDING:
        return 'Waiting';
      case CONTEST_STATUS.FINISHED:
        return 'Ended';
      default:
        return null;
    }
  };

  const { id, status, title, contestType, prize, count } = props.data;
  return (
    <div
      className={styles.contestBoxContainer}
      onClick={() => props.goToExtended(id)}
    >
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </div>
        <div className={styles.contestType}>
          <span>{`${ucFirstLetter(
            contestType
          )} / ${getPreferenceContest()}`}</span>
        </div>
        <div className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </div>
        <div className={styles.prizeContainer}>
          <div className={styles.guaranteedContainer}>
            <div>
              <img src={`${STATIC_IMAGES_PATH}smallCheck.png`} alt="check" />
            </div>
            <span>Guaranteed prize</span>
          </div>
          <div className={styles.prize}>
            <img src={`${STATIC_IMAGES_PATH}diamond.png`} alt="diamond" />
            <span>{`$${prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <img src={`${STATIC_IMAGES_PATH}entrieImage.png`} alt="logo" />
            <span>{count}</span>
          </div>
          <span>Entries</span>
        </div>
        <div className={styles.timeContainer}>
          <span className={styles.timeContest}>{getTimeStr()}</span>
          <span>{getStatusName(status)}</span>
        </div>
      </div>
    </div>
  );
};

export default ContestBox;
