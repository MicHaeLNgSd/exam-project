import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { checkAuth, clearAuth } from '../../../store/slices/authSlice';
import styles from './LoginForm.module.sass';
import FormInput from '../../InputComponents/FormInput/FormInput';
import Schems from '../../../utils/validators/validationSchems';
import Error from '../../Error/Error';
import CONSTANTS from '../../../constants';

const LoginForm = ({ authClear, loginRequest, history, auth, submitting }) => {
  const { error, isFetching } = auth;

  useEffect(() => () => authClear(), [authClear]);

  const submitHandler = (values) => loginRequest({ data: values, history });

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.loginForm}>
      {error && (
        <Error data={error.data} status={error.status} clearError={authClear} />
      )}
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={submitHandler}
        validationSchema={Schems.LoginSchem}
      >
        <Form>
          <FormInput
            classes={formInputClasses}
            name="email"
            type="text"
            label="Email Address"
            autoFocus
          />
          <FormInput
            classes={formInputClasses}
            name="password"
            type="password"
            label="Password"
          />
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'LOGIN'}
            </span>
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  loginRequest: ({ data, history }) =>
    dispatch(checkAuth({ data, history, authMode: CONSTANTS.AUTH_MODE.LOGIN })),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
