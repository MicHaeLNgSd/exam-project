import React from 'react';
import styles from './EventCreatorForm.module.sass';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormInput from '../../FormInput/FormInput';
import { useDispatch } from 'react-redux';
import { addEvent, setEvents } from '../../../store/slices/eventsSlice';

const initialValues = {
  text: '',
  endTime: '',
  reminderTime: '',
};

function EventCreatorForm() {
  const dispatch = useDispatch();
  const submitHandler = (values, { resetForm }) => {
    dispatch(addEvent(values));
    dispatch(setEvents());
    resetForm();
  };

  return (
    <>
      <h2 className={styles.formHeader}>Create new event</h2>
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <Form className={styles.form}>
          <label className={styles.textWrapper}>
            Event message:
            <Field type="text" name="text" className={styles.textInput}></Field>
            <ErrorMessage
              name="text"
              component="span"
              className={styles.error}
            />
          </label>

          <div className={styles.timeWrapper}>
            <label className={styles.timeInputLabel}>
              Finish Time:
              <FormInput
                type="datetime-local"
                name="endTime"
                className={styles.timeInput}
              />
            </label>
            <label className={styles.timeInputLabel}>
              Reminder Time:
              <FormInput
                type="datetime-local"
                name="reminderTime"
                className={styles.timeInput}
              />
            </label>
          </div>

          <div className={styles.btnsWrapper}>
            <button className={styles.btn} type="submit">
              Add
            </button>
            <button className={styles.btn} type="reset">
              Clear
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default EventCreatorForm;
