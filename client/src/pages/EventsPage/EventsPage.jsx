import React from 'react';
import { RxLapTimer } from 'react-icons/rx';
import styles from './EventsPage.module.sass';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EventTimer from '../../components/Events/EventTimer/EventTimer';
import EventCreatorForm from '../../components/Events/EventCreatorForm/EventCreatorForm';

function EventsPage() {
  return (
    <>
      <Header />
      <main className={styles.eventsMain}>
        <section className={styles.eventsSec}>
          <EventCreatorForm />
        </section>
        <section className={styles.eventsSec}>
          <div className={styles.timersHeaderWrapper}>
            <h2 className={styles.timerHeader}>Live upcomming checks</h2>
            <div className={styles.timerTimeWrapper}>
              <h3 className={styles.timerTimeHeader}>Remaining time</h3>
              <RxLapTimer className={styles.timerIcon} />
            </div>
          </div>
          <ul className={styles.timersWrapper}>
            <li className={styles.timersItem}>
              <EventTimer />
            </li>
            <li className={styles.timersItem}>
              <EventTimer />
            </li>
            <li className={styles.timersItem}>
              <EventTimer />
            </li>
            <li className={styles.timersItem}>
              <EventTimer />
            </li>
            <li className={styles.timersItem}>
              <EventTimer />
            </li>
            <li className={styles.timersItem}>
              <EventTimer />
            </li>
            <li className={styles.timersItem}>
              <EventTimer />
            </li>
            <li className={styles.timersItem}>
              <EventTimer />
            </li>
            <li className={styles.timersItem}>
              <EventTimer />
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventsPage;
