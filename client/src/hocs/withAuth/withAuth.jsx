import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../../components/Spinner/Spinner';
import CONSTANTS from '../../constants';
const { CREATOR, CUSTOMER, MODERATOR } = CONSTANTS;

const allRoles = [CUSTOMER, CREATOR, MODERATOR];

const withAuth = (Component, props, accessRoles = allRoles) => {
  const Hoc = ({ data, isFetching, getUser, history, match }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      if (!data) {
        getUser();
      }
      setIsLoading(false);
    }, [data, getUser, isLoading]);

    if (isFetching || isLoading) return <Spinner />;

    if (!data || !accessRoles.includes(data?.role))
      return <Redirect to="/login" />;

    return <Component history={history} match={match} {...props} />;
  };

  const mapStateToProps = (state) => state.userStore;
  const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default withAuth;
