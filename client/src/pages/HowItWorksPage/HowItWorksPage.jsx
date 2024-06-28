import React from 'react';
import Header from '../../components/Header/Header';
import CONSTANTS from '../../constants';
import styles from './HowItWorksPage.module.sass';
import classNames from 'classnames';
import { WAYS_TO_USE } from './HowItWorksData';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const IMG_PATH = `${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/`;

function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className={styles.howItWorksMain}>
        <section className={styles.howWorksSec}>
          <div className={styles.howWorksInfo}>
            <h4 className={styles.howWorksTag}>World's #1 Naming Platform</h4>
            <div className={styles.howWorksInfo}>
              <h1 className={styles.howWorksHeader}>How Does Atom Work?</h1>
              <p className={styles.howWorksText}>
                Atom helps you come up with a great name for your business by
                combining the power of crowdsourcing with sophisticated
                technology and Agency-level validation services.
              </p>
            </div>

            <a
              className={styles.howItWorksBtn}
              href="https://vimeo.com/368584367"
            >
              <i className={classNames('fas fa-play', styles.playBtn)} />
              Play Video
            </a>
          </div>
          <img
            src={`${IMG_PATH}app-user.svg`}
            alt="app-user"
            className={styles.howWorksImg}
          />
        </section>

        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
      </main>
    </>
  );
}

export default HowItWorksPage;
