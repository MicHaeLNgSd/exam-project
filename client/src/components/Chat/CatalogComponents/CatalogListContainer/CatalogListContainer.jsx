import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

const CatalogListContainer = ({
  getCatalogList,
  chatStore,
  userStore,
  removeChatFromCatalog,
}) => {
  const { currentCatalog, catalogList, isShowChatsInCatalog, messagesPreview } =
    chatStore;
  const { id } = userStore.data;

  useEffect(() => {
    getCatalogList();
  }, [getCatalogList]);

  const handleRemoveChatFromCatalog = (event, chatId) => {
    const { id: catalogId } = currentCatalog;
    removeChatFromCatalog({ chatId, catalogId });
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const { chats } = currentCatalog;
    const dialogsInCatalog = messagesPreview.filter((mp) =>
      chats.includes(mp.id)
    );
    return dialogsInCatalog;
  };

  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={handleRemoveChatFromCatalog}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getCatalogList: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalog: (data) => dispatch(removeChatFromCatalog(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
