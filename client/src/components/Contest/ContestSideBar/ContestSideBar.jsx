import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './ContestSideBar.module.sass';
import CONSTANTS from '../../../constants';
import _ from 'lodash';

const getEntriesInfo = (infoObj, namingArr = []) =>
  Object.entries(infoObj)
    .filter(([, count]) => count)
    .map(([status, count]) => (
      <div key={status} className={styles.totalEntrie}>
        <span className={styles.totalEntriesLabel}>
          {namingArr[status] || `${_.startCase(status)} Entries`}
        </span>
        <span>{count}</span>
      </div>
    ));

const ContestSideBar = (props) => {
  const getTimeStr = () => {
    const diff = moment.duration(
      moment().diff(moment(props.contestData.createdAt))
    );
    let str = '';
    if (diff._data.days !== 0) str = `${diff._data.days} days `;
    if (diff._data.hours !== 0) str += `${diff._data.hours} hours`;
    if (str.length === 0) str = 'less than 1h';
    return str;
  };

  const { offers } = props;
  const totalEntries = offers.length;
  const entriesCountsObj = _.countBy(offers, 'status');
  const { User, prize } = props.contestData;

  return (
    <div className={styles.contestSideBarInfo}>
      <div className={styles.contestInfo}>
        <div className={styles.awardAndTimeContainer}>
          <div className={styles.prizeContainer}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}big-diamond.png`}
              alt="diamond"
            />
            <span>{`$ ${prize}`}</span>
          </div>
          <div className={styles.timeContainer}>
            <div className={styles.timeDesc}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`}
                alt="clock"
              />
              <span>Going</span>
            </div>
            <span className={styles.time}>{getTimeStr()}</span>
          </div>
          <div className={styles.guaranteedPrize}>
            <div>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}smallCheck.png`}
                alt="check"
              />
            </div>
            <span>Guaranteed prize</span>
          </div>
        </div>
        <div className={styles.contestStats}>
          <span>Contest Stats</span>
          <div className={styles.totalEntrie}>
            <span className={styles.totalEntriesLabel}>Total Entries</span>
            <span>{totalEntries}</span>
          </div>
          {getEntriesInfo(entriesCountsObj)}
        </div>
      </div>
      {props.data.id !== User.id && (
        <div className={styles.infoCustomerContainer}>
          <span className={styles.labelCustomerInfo}>About Contest Holder</span>
          <div className={styles.customerInfo}>
            <img
              src={
                User.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicImagesURL}${User.avatar}`
              }
              alt="user"
            />
            <div className={styles.customerNameContainer}>
              <div className={styles.customerFullNameContainer}>
                <span>{User.firstName}</span>
                <span>{User.lastName}</span>
              </div>
              <span>{User.displayName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps, null)(ContestSideBar);
