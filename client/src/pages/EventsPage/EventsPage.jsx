import React from 'react';
import { RxLapTimer } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import styles from './EventsPage.module.sass';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import EventTimer from '../../components/Events/EventTimer/EventTimer';
import EventCreatorForm from '../../components/Events/EventCreatorForm/EventCreatorForm';
import { clearEvents, setEvents } from '../../store/slices/eventsSlice';

function EventsPage() {
  const events = useSelector((state) => state.eventsStore.events);
  const dispatch = useDispatch();
  const clickHandler = () => {
    confirmAlert({
      title: 'Confirm to clear',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(clearEvents());
            dispatch(setEvents());
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };
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
          {!!events.length ? (
            <ul className={styles.timersWrapper}>
              {events.map((e, i) => (
                <li key={i} className={styles.timersItem}>
                  <EventTimer event={e} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyEventsString}>
              There is any events right now
            </p>
          )}
          <div className={styles.btnWrapper}>
            <button
              className={styles.btn}
              onClick={clickHandler}
              disabled={!events.length}
            >
              Close All
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventsPage;
