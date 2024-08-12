import React from 'react';
import styles from './TryAgain.module.sass';
import { FaRedo } from 'react-icons/fa';

const TryAgain = ({ getData }) => {
  return (
    <div className={styles.container} onClick={() => getData()}>
      <span className={styles.text}>Server Error. Try again</span>
      <FaRedo className={styles.icon} />
    </div>
  );
};

export default TryAgain;
