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
        <section className={styles.useWaysSec}>
          <div className={styles.useWaysHead}>
            <h4 className={styles.useWaysTag}>Our Services</h4>
            <h2 className={styles.useWaysHeader}>3 Ways To Use Atom</h2>
            <p className={styles.useWaysText}>
              Atom offers 3 ways to get you a perfect name for your business.
            </p>
          </div>
          <div className={styles.useWaysList}>
            {WAYS_TO_USE.map((way, index) => (
              <div key={index} className={styles.useWaysItem}>
                <img src={`${IMG_PATH}${way.iconURL}`} alt={way.alt} />
                <h3>{way.header}</h3>
                <p>{way.text}</p>
                <Link to={way.btnLink} className={styles.useWaysBtn}>
                  {way.btnText}
                  <img
                    className={styles.useWaysBtnArrow}
                    src={`${IMG_PATH}icon-arrow-long-right.svg`}
                    alt="arrow-right"
                  />
                </Link>
              </div>
            ))}
          </div>
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
