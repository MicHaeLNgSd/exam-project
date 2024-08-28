import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';
import RenderMainDialog from './RenderMainDialog/RenderMainDialog';

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
      <RenderMainDialog
        userId={userId}
        messages={messages}
        messagesEnd={messagesEnd}
      />
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
