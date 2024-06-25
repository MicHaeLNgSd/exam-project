import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginRegHeader.module.sass';
import CONSTANTS from '../../constants';
import Logo from '../Logo';

function LoginRegHeader({ to, linkText }) {
  return (
    <div className={styles.headerSignUpPage}>
      <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />
      <div className={styles.linkLoginContainer}>
        <Link to={to}>
          <span>{linkText}</span>
        </Link>
      </div>
    </div>
  );
}

export default LoginRegHeader;
