import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './Chat.module.sass';
import Dialog from '../../DialogComponents/Dialog/Dialog';
import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
} from '../../../../store/slices/chatSlice';
import { chatController } from '../../../../api/ws/socketController';
import CatalogCreation from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import ChatError from '../ChatError/ChatError';
import RenderDialogList from './RenderDialogList/RenderDialogList';

const Chat = ({
  userStore,
  getPreviewChat,
  setChatPreviewMode,
  chatStore,
  changeShow,
}) => {
  const { isExpanded, isShow, isShowCatalogCreation, error } = chatStore;
  const { id } = userStore.data;

  useEffect(() => {
    chatController.subscribeChat(id);
    getPreviewChat();

    return () => chatController.unsubscribeChat(id);
  }, [id, getPreviewChat]);

  return (
    <div
      className={classNames(styles.chatContainer, {
        [styles.showChat]: isShow,
      })}
    >
      {error && <ChatError getData={getPreviewChat} />}
      {isShowCatalogCreation && <CatalogCreation />}
      {isExpanded ? (
        <Dialog userId={id} />
      ) : (
        <RenderDialogList
          userId={id}
          chatStore={chatStore}
          setChatPreviewMode={setChatPreviewMode}
        />
      )}
      <div className={styles.toggleChat} onClick={() => changeShow()}>
        {isShow ? 'Hide Chat' : 'Show Chat'}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  changeShow: () => dispatch(changeChatShow()),
  setChatPreviewMode: (mode) => dispatch(setPreviewChatMode(mode)),
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  clearChatError: () => dispatch(clearChatError()),
  getPreviewChat: () => dispatch(getPreviewChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
