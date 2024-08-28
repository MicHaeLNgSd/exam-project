import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { clearUserError } from '../../../store/slices/userSlice';
import styles from './UpdateUserInfoForm.module.sass';
import ImageUpload from '../../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../../InputComponents/FormInput/FormInput';
import Schems from '../../../utils/validators/validationSchems';
import Error from '../../Error/Error';
import CONSTANTS from '../../../constants';

const UpdateUserInfoForm = (props) => {
  const { onSubmit, submitting, error, clearUserError } = props;
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={props.initialValues}
      validationSchema={Schems.UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={clearUserError}
          />
        )}
        <ImageUpload
          name="avatar"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.avatar,
            error: styles.error,
          }}
        />
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>
          <FormInput
            name="lastName"
            type="text"
            label="LastName"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>
          <FormInput
            name="displayName"
            type="text"
            label="Display Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

const mapStateToProps = (state) => {
  const { data, error } = state.userStore;
  return {
    error,
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      avatar:
        data.avatar === 'anon.png'
          ? CONSTANTS.ANONYM_IMAGE_PATH
          : `${CONSTANTS.publicImagesURL}${data.avatar}`,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearUserError: () => dispatch(clearUserError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoForm);
