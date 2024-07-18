import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../../components/Spinner/Spinner';

const withAuth = (Component, props) => {
  const Hoc = ({ data, isFetching, getUser, history, match }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!data) {
        getUser();
      }
      setLoading(false);
    }, [data, getUser, loading]);

    if (isFetching || loading) return <Spinner />;

    if (!data) return <Redirect to="/login" />;

    return <Component history={history} match={match} {...props} />;
  };

  const mapStateToProps = (state) => state.userStore;
  const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default withAuth;
