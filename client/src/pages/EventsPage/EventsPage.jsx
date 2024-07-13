import React from 'react';
import { RxLapTimer } from 'react-icons/rx';
import styles from './EventsPage.module.sass';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EventTimer from '../../components/Events/EventTimer/EventTimer';
import EventCreatorForm from '../../components/Events/EventCreatorForm/EventCreatorForm';
import moment from 'moment';

const InitEvents = [
  {
    endTime: moment('2024-07-10T22:44:00+03:00'),
    createdAt: moment('2024-07-08T19:00:00+03:00'),
  },
  {
    endTime: moment('2024-07-09T19:44:00+03:00'),
    createdAt: moment('2024-07-08T19:00:00+03:00'),
  },
  {
    endTime: moment('2024-07-11T10:44:00+03:00'),
    createdAt: moment('2024-07-08T19:00:00+03:00'),
  },
].sort((a, b) => a.endTime - b.endTime);

function EventsPage({ events = InitEvents }) {
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
            {events.map((e, i) => (
              <li key={i} className={styles.timersItem}>
                <EventTimer event={e} />
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventsPage;
