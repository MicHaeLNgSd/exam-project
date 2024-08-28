import React from 'react';
import styles from './EventsPage.module.sass';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EventCreatorForm from '../../components/Forms/EventCreatorForm/EventCreatorForm';
import EventsSection from './EventsSection/EventsSection';

function EventsPage() {
  return (
    <div className={styles.eventsPageWrapper}>
      <Header />
      <main className={styles.eventsMain}>
        <section className={styles.eventsSec}>
          <EventCreatorForm />
        </section>
        <EventsSection className={styles.eventsSec} />
      </main>
      <Footer />
    </div>
  );
}

export default EventsPage;
