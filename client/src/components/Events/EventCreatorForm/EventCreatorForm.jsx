import React from 'react';
import styles from './EventCreatorForm.module.sass';

function EventCreatorForm() {
  return (
    <div>
      <h2 className={styles.formHeader}>Add new event</h2>
      <form className={styles.form}>
        <label className={styles.textWrapper}>
          Event Text:
          <input type="text" className={styles.textInput} />
        </label>

        <div className={styles.eventTimeWrapper}>
          <label>
            Finish Time:
            <input type="datetime-local" />
          </label>
          <label>
            Reminder Time:
            <input type="datetime-local" />
          </label>
        </div>

        <div className={styles.btnsWrapper}>
          <button className={styles.btn}>Add</button>
          <button className={styles.btn}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default EventCreatorForm;
