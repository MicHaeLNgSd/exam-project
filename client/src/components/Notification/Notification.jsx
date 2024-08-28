import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Notification.module.sass';

const Notification = ({ history, message, contestId }) => {
  const clickHandler = () => history.push(`/contest/${contestId}`);

  return (
    <div>
      <br />
      <span>{message}</span>
      <br />
      {contestId && (
        <span onClick={clickHandler} className={styles.goToContest}>
          Go to contest
        </span>
      )}
    </div>
  );
};

export default withRouter(Notification);
