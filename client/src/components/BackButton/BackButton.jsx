import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './BackButton.module.sass';

const BackButton = ({ history }) => {
  const clickHandler = () => history.goBack();

  return (
    <div onClick={clickHandler} className={styles.buttonContainer}>
      Back
    </div>
  );
};

export default withRouter(BackButton);
