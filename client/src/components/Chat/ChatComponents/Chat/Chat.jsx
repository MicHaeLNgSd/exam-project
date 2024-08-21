import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DialogListContainer from '../../DialogComponents/DialogListContainer/DialogListContainer';
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
import CONSTANTS from '../../../../constants';
import CatalogListContainer from '../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import CatalogCreation from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import CatalogListHeader from '../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import ChatError from '../ChatError/ChatError';
import Logo from '../../../Logo';

class Chat extends React.Component {
  componentDidMount() {
    chatController.subscribeChat(this.props.userStore.data.id);
    this.props.getPreviewChat();
  }

  componentWillUnmount() {
    chatController.unsubscribeChat(this.props.userStore.data.id);
  }

  renderDialogList = () => {
    const { setChatPreviewMode } = this.props;
    const { chatMode, isShowChatsInCatalog } = this.props.chatStore;
    const { id } = this.props.userStore.data;
    const { CHAT_MODE } = CONSTANTS;
    return (
      <div>
        {isShowChatsInCatalog && <CatalogListHeader />}
        {!isShowChatsInCatalog && (
          <div className={styles.chatHeader}>
            <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />
          </div>
        )}
        {!isShowChatsInCatalog && (
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => setChatPreviewMode(CHAT_MODE.NORMAL_PREVIEW)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CHAT_MODE.NORMAL_PREVIEW,
              })}
            >
              Normal
            </span>
            <span
              onClick={() => setChatPreviewMode(CHAT_MODE.FAVORITE_PREVIEW)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CHAT_MODE.FAVORITE_PREVIEW,
              })}
            >
              Favorite
            </span>
            <span
              onClick={() => setChatPreviewMode(CHAT_MODE.BLOCKED_PREVIEW)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CHAT_MODE.BLOCKED_PREVIEW,
              })}
            >
              Blocked
            </span>
            <span
              onClick={() => setChatPreviewMode(CHAT_MODE.CATALOG_PREVIEW)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CHAT_MODE.CATALOG_PREVIEW,
              })}
            >
              Catalog
            </span>
          </div>
        )}
        {chatMode === CHAT_MODE.CATALOG_PREVIEW ? (
          <CatalogListContainer />
        ) : (
          <DialogListContainer userId={id} />
        )}
      </div>
    );
  };

  render() {
    const { isExpanded, isShow, isShowCatalogCreation, error } =
      this.props.chatStore;
    const { id } = this.props.userStore.data;
    const { changeShow, getPreviewChat } = this.props;
    return (
      <div
        className={classNames(styles.chatContainer, {
          [styles.showChat]: isShow,
        })}
      >
        {error && <ChatError getData={getPreviewChat} />}
        {isShowCatalogCreation && <CatalogCreation />}
        {isExpanded ? <Dialog userId={id} /> : this.renderDialogList()}
        <div className={styles.toggleChat} onClick={() => changeShow()}>
          {isShow ? 'Hide Chat' : 'Show Chat'}
        </div>
      </div>
    );
  }
}

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
