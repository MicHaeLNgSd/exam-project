import React from 'react';
import { connect } from 'react-redux';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import { clearAuthError } from '../../store/slices/authSlice';
import LoginRegHeader from '../../components/LoginRegHeader/LoginRegHeader';
import RegistrationFooter from './RegistrationFooter/RegistrationFooter';

const RegistrationPage = (props) => {
  props.clearError();

  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <LoginRegHeader to={'/login'} linkText={'Login'} />
        <RegistrationForm history={props.history} />
      </div>
      <RegistrationFooter />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearAuthError()),
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
