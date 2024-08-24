import React from 'react';
import styles from './EventCreatorForm.module.sass';
import { Form, Formik } from 'formik';
import FormInput from '../../InputComponents/FormInput/FormInput';
import { useDispatch } from 'react-redux';
import { addEvent, setEvents } from '../../../store/slices/eventsSlice';
import Schems from '../../../utils/validators/validationSchems';

const initialValues = {
  text: '',
  endTime: '',
  reminderTime: '',
};

const classes = {
  container: styles.inputContainer,
  warning: styles.warning,
  notValid: styles.notValid,
  valid: styles.valid,
};
const classesText = { ...classes, input: styles.textInput };
const classesTime = { ...classes, input: styles.timeInput };

const EventCreatorForm = () => {
  const dispatch = useDispatch();
  const submitHandler = (values, { resetForm }) => {
    dispatch(addEvent(values));
    dispatch(setEvents());
    resetForm();
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <h2 className={styles.formHeader}>Create new event</h2>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={Schems.EventCreationSchema}
      >
        <Form className={styles.form}>
          <label className={styles.textWrapper}>
            Event message:
            <FormInput name="text" classes={classesText} />
          </label>

          <div className={styles.timeContiner}>
            <label className={styles.timeWrapper}>
              Finish Time:
              <FormInput
                type="datetime-local"
                name="endTime"
                classes={classesTime}
              />
            </label>
            <label className={styles.timeWrapper}>
              Reminder Time:
              <FormInput
                type="datetime-local"
                name="reminderTime"
                classes={classesTime}
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
};

export default EventCreatorForm;
