import React from 'react';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';
import CONSTANTS from '../../../../constants';
const allRoles = Object.values(CONSTANTS.USER_ROLE);

const ChatContainer = ({ roles = allRoles, data }) => {
  if (!data || !roles.includes(data?.role)) return null;
  return <Chat />;
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  return { data };
};

export default connect(mapStateToProps, null)(ChatContainer);
