import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FaRegTimesCircle } from 'react-icons/fa';
import CONSTANTS from '../../../../constants';
import {
  changeTypeOfChatAdding,
  changeShowAddChatToCatalogMenu,
  getCatalogList,
} from '../../../../store/slices/chatSlice';
import styles from './CatalogCreation.module.sass';
import AddToCatalog from '../AddToCatalog/AddToCatalog';
import CreateCatalog from '../CreateCatalog/CreateCatalog';

const CatalogCreation = ({
  getCatalogList,
  changeTypeOfChatAdding,
  catalogCreationMode,
  changeShowAddChatToCatalogMenu,
  isFetching,
}) => {
  const { ADD_CHAT_TO_OLD_CATALOG, CREATE_NEW_CATALOG_AND_ADD_CHAT } =
    CONSTANTS;

  useEffect(() => {
    getCatalogList();
  }, [getCatalogList]);

  return (
    <>
      {!isFetching && (
        <div className={styles.catalogCreationContainer}>
          <FaRegTimesCircle
            className={styles.closeIcon}
            onClick={() => changeShowAddChatToCatalogMenu()}
          />
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => changeTypeOfChatAdding(ADD_CHAT_TO_OLD_CATALOG)}
              className={classNames(styles.tab, {
                [styles.active]:
                  catalogCreationMode === ADD_CHAT_TO_OLD_CATALOG,
              })}
            >
              Old
            </span>
            <span
              onClick={() =>
                changeTypeOfChatAdding(CREATE_NEW_CATALOG_AND_ADD_CHAT)
              }
              className={classNames(styles.tab, {
                [styles.active]:
                  catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT,
              })}
            >
              New
            </span>
          </div>
          {catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT ? (
            <CreateCatalog />
          ) : (
            <AddToCatalog />
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  changeTypeOfChatAdding: (data) => dispatch(changeTypeOfChatAdding(data)),
  changeShowAddChatToCatalogMenu: () =>
    dispatch(changeShowAddChatToCatalogMenu()),
  getCatalogList: () => dispatch(getCatalogList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogCreation);
