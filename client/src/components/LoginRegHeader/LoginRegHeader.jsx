import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginRegHeader.module.sass';
import CONSTANTS from '../../constants';
import Logo from '../Logo';

const LoginRegHeader = ({ to, linkText }) => {
  return (
    <div className={styles.header}>
      <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />
      <Link to={to} className={styles.loginRegLink}>
        {linkText}
      </Link>
    </div>
  );
};

export default LoginRegHeader;
