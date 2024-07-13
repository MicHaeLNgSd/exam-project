import React from 'react';
import { RxLapTimer } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import styles from './EventsPage.module.sass';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EventTimer from '../../components/Events/EventTimer/EventTimer';
import EventCreatorForm from '../../components/Events/EventCreatorForm/EventCreatorForm';

function EventsPage() {
  const events = useSelector((state) => state.eventsStore.events);

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
