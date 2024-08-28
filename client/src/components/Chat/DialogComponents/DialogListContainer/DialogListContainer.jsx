import React from 'react';
import { connect } from 'react-redux';
import DialogList from '../DialogList/DialogList';

const DialogListContainer = ({ userId, messagesPreview }) => {
  return <DialogList preview={messagesPreview} userId={userId} />;
};

const mapStateToProps = (state) => state.chatStore;

export default connect(mapStateToProps)(DialogListContainer);
