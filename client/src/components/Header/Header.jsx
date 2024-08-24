import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import Logo from '../Logo';
import NavBarList from './NavBarList/NavBarList';
import { NAVIGATION_LIST } from './HeaderData';
import LoginButtons from './LoginButtons/LoginButtons';
import { clearChatStore } from '../../store/slices/chatSlice';

const Header = ({
  history,
  clearUserStore,
  clearChatStore,
  data,
  getUser,
  isFetching,
}) => {
  const logOut = () => {
    localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
    clearUserStore();
    clearChatStore();
    history.replace('/login');
  };

  useEffect(() => {
    const hasToken = localStorage.getItem(CONSTANTS.ACCESS_TOKEN) !== null;
    if (!data && hasToken) getUser();
  }, [data, getUser]);

  const startContests = () => {
    history.push('/start-contest');
  };

  const startOffersReview = () => {
    history.push('/offers-review');
  };

  if (isFetching) return null;
  return (
    <>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>

      <div className={styles.headerContainer}>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <a href={`tel:${CONSTANTS.COMPANY_CONTACTS.TEL_NUMBER}`}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`}
                alt="phone"
              />
              <span>{CONSTANTS.COMPANY_CONTACTS.TEL_NUMBER}</span>
            </a>
          </div>
          <div className={styles.userButtonsContainer}>
            <LoginButtons data={data} logOut={logOut} />
          </div>
        </div>
        <div className={styles.navContainer}>
          <Logo className={styles.logo} alt="blue_logo" />
          <div className={styles.leftNav}>
            <nav className={styles.nav}>
              <NavBarList navList={NAVIGATION_LIST} />
            </nav>
            {data?.role === CONSTANTS.USER_ROLE.CUSTOMER && (
              <button
                className={styles.startContestBtn}
                onClick={startContests}
              >
                START CONTEST
              </button>
            )}
            {data?.role === CONSTANTS.USER_ROLE.MODERATOR && (
              <button
                className={styles.startContestBtn}
                onClick={startOffersReview}
              >
                START OFFERS REVIEW
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
  clearChatStore: () => dispatch(clearChatStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
