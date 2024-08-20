import React from 'react';
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

class Header extends React.Component {
  componentDidMount() {
    const hasToken = localStorage.getItem(CONSTANTS.ACCESS_TOKEN) !== null;
    if (!this.props.data && hasToken) {
      this.props.getUser();
    }
  }

  logOut = () => {
    localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
    this.props.clearUserStore();
    this.props.clearChatStore();
    this.props.history.replace('/login');
  };

  startContests = () => {
    this.props.history.push('/start-contest');
  };

  startOffersReview = () => {
    this.props.history.push('/offers-review');
  };

  render() {
    if (this.props.isFetching) {
      return null;
    }
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
              <a href={`tel:${CONSTANTS.PHONE_NUMBER}`}>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`}
                  alt="phone"
                />
                <span>{CONSTANTS.PHONE_NUMBER}</span>
              </a>
            </div>
            <div className={styles.userButtonsContainer}>
              <LoginButtons data={this.props.data} logOut={this.logOut} />
            </div>
          </div>
          <div className={styles.navContainer}>
            <Logo className={styles.logo} alt="blue_logo" />
            <div className={styles.leftNav}>
              <nav className={styles.nav}>
                <NavBarList navList={NAVIGATION_LIST} />
              </nav>
              {this.props.data?.role === CONSTANTS.CUSTOMER && (
                <button
                  className={styles.startContestBtn}
                  onClick={this.startContests}
                >
                  START CONTEST
                </button>
              )}
              {this.props.data?.role === CONSTANTS.MODERATOR && (
                <button
                  className={styles.startContestBtn}
                  onClick={this.startOffersReview}
                >
                  START OFFERS REVIEW
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
  clearChatStore: () => dispatch(clearChatStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
