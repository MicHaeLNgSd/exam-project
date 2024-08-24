import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';

const Dialog = ({
  getDialog,
  clearMessageList,
  interlocutor,
  messages,
  userId,
  chatData,
}) => {
  const messagesEnd = useRef();

  const scrollToBottom = () => {
    if (messagesEnd.current)
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    getDialog({ interlocutorId: interlocutor?.id });
    scrollToBottom();

    return () => clearMessageList();
  }, [interlocutor?.id, getDialog, clearMessageList]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMainDialog = () => {
    const messagesArray = [];
    let currentTime = moment();
    messages.forEach((message, i) => {
      if (!currentTime.isSame(message.createdAt, 'date')) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>
        );
        currentTime = moment(message.createdAt);
      }
      messagesArray.push(
        <div
          key={i}
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
          <div ref={messagesEnd} />
        </div>
      );
    });
    return <div className={styles.messageList}>{messagesArray}</div>;
  };

  const blockMessage = () => {
    const { blackList, participants } = chatData;
    const userIndex = participants.indexOf(userId);

    const message = blackList[userIndex]
      ? 'You have blocked this user'
      : 'This user has blocked you';

    return <span className={styles.messageBlock}>{message}</span>;
  };

  return (
    <>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      <div ref={messagesEnd} />
      {chatData?.blackList.includes(true) ? blockMessage() : <ChatInput />}
    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
