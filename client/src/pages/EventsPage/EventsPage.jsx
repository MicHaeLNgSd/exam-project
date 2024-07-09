import React from 'react';
import { RxLapTimer } from 'react-icons/rx';
import styles from './EventsPage.module.sass';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EventTimer from '../../components/Events/EventTimer/EventTimer';

function EventsPage() {
  return (
    <>
      <Header />
      <main>
        <h1>EventsPage</h1>
        <section>Create</section>
        <section>
          <div className={styles.timersHeaderWrapper}>
            <h2>Live upcomming checks</h2>
            <div>
              Remaining time <RxLapTimer className={styles.timerIcon} />
            </div>
          </div>
          <div className={styles.timersWrapper}>
            <ul>
              <li>
                <EventTimer />
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventsPage;
