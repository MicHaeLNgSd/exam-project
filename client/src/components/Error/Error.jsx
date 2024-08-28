import React from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import styles from './Error.module.sass';

const Error = (props) => {
  const getMessage = () => {
    const { status, data } = props;
    switch (status) {
      case 404:
        return data;
      case 400:
        return 'Check the input data';
      case 409:
        return data;
      case 403:
        return 'Bank decline transaction';
      case 406:
        return data;
      default:
        return 'Server Error';
    }
  };

  const { clearError } = props;
  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <FaRegTimesCircle className={styles.icon} onClick={() => clearError()} />
    </div>
  );
};

export default Error;
