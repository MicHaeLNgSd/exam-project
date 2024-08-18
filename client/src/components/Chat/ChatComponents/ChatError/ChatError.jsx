import React from 'react';
import { FaRedo } from 'react-icons/fa';
import styles from './ChatError.module.sass';

const ChatError = (props) => {
  const { getData } = props;
  return (
    <div className={styles.errorContainer} onClick={() => getData()}>
      <div className={styles.container}>
        <span>Server Error</span>
        <FaRedo className={styles.icon} />
      </div>
    </div>
  );
};

export default ChatError;
