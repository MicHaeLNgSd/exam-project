import React from 'react';
import styles from './RenderDialogList.module.sass';
import classNames from 'classnames';
import CONSTANTS from '../../../../../constants';
import CatalogListHeader from '../../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import CatalogListContainer from '../../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import DialogListContainer from '../../../DialogComponents/DialogListContainer/DialogListContainer';
import Logo from '../../../../Logo';

const RenderDialogList = ({ userId, chatStore, setChatPreviewMode }) => {
  const { CHAT_MODE } = CONSTANTS;
  const { chatMode, isShowChatsInCatalog } = chatStore;

  const getChatModeBtn = (text, mode) => (
    <span
      onClick={() => setChatPreviewMode(mode)}
      className={classNames(styles.button, {
        [styles.activeButton]: chatMode === mode,
      })}
    >
      {text}
    </span>
  );

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
          {getChatModeBtn('Normal', CHAT_MODE.NORMAL_PREVIEW)}
          {getChatModeBtn('Favorite', CHAT_MODE.FAVORITE_PREVIEW)}
          {getChatModeBtn('Blocked', CHAT_MODE.BLOCKED_PREVIEW)}
          {getChatModeBtn('Catalog', CHAT_MODE.CATALOG_PREVIEW)}
        </div>
      )}
      {chatMode === CHAT_MODE.CATALOG_PREVIEW ? (
        <CatalogListContainer />
      ) : (
        <DialogListContainer userId={userId} />
      )}
    </div>
  );
};

export default RenderDialogList;
