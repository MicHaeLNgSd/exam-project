import React from 'react';
import { LOGIN_BUTTONS } from '../HeaderData';
import CONSTANTS from '../../../constants';
import { Link } from 'react-router-dom';
import styles from '../Header.module.sass';

function LoginButtons({ data, logOut }) {
  if (!data) {
    return (
      <>
        <Link to="/login">
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration">
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  }

  const userAvatar =
    data.avatar === 'anon.png'
      ? CONSTANTS.ANONYM_IMAGE_PATH
      : `${CONSTANTS.publicImagesURL}${data.avatar}`;

  return (
    <>
      <div className={styles.userInfo}>
        <img src={userAvatar} alt="user" />
        <span>{`Hi, ${data.displayName}`}</span>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
        <ul>
          {LOGIN_BUTTONS.map((btn, index) => (
            <li key={index}>
              <Link to={btn.link}>
                <span>{btn.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <span onClick={logOut}>Logout</span>
          </li>
        </ul>
      </div>
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
        className={styles.emailIcon}
        alt="email"
      />
    </>
  );
}

export default LoginButtons;
