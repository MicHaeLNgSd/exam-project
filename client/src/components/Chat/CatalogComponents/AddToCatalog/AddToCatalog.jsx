import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import SelectInput from '../../../InputComponents/SelectInput/SelectInput';
import { addChatToCatalog } from '../../../../store/slices/chatSlice';
import styles from './AddToCatalog.module.sass';

const AddToCatalog = ({ catalogList, addChatToCatalog, addChatId }) => {
  const getCatalogsNames = () => catalogList.map((c) => c.catalogName);
  const getValueArray = () => catalogList.map((c) => c.id);

  const submitHandler = ({ catalogId }) =>
    addChatToCatalog({ chatId: addChatId, catalogId });

  const selectArray = getCatalogsNames();
  return (
    <>
      {selectArray.length !== 0 ? (
        <Formik onSubmit={submitHandler} initialValues={{ catalogId: '' }}>
          <Form className={styles.form}>
            <SelectInput
              name="catalogId"
              header="name of catalog"
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              optionsArray={selectArray}
              valueArray={getValueArray()}
            />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      ) : (
        <div className={styles.notFound}>
          You have not created any directories.
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  addChatToCatalog: (data) => dispatch(addChatToCatalog(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCatalog);
