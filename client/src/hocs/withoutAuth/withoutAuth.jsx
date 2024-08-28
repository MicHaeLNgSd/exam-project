import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../../components/Spinner/Spinner';
import CONSTANTS from '../../constants';

const withoutAuth = (Component) => {
  const HocForLoginSignUp = ({
    checkAuth,
    history,
    isFetching,
    data,
    ...restProps
  }) => {
    useEffect(() => {
      const hasToken = localStorage.getItem(CONSTANTS.ACCESS_TOKEN) !== null;
      if (hasToken) checkAuth(history.replace);
    }, [checkAuth, history.replace]);

    if (isFetching) return <Spinner />;
    if (!data) return <Component history={history} {...restProps} />;
    return null;
  };

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (replace) => dispatch(getUser(replace)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default withoutAuth;
