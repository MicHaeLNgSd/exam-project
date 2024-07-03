import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './UseWaysSec.module.sass';
import { WAYS_TO_USE } from '../HowItWorksData';

function UseWaysSec({ imgPath }) {
  return (
    <section className={styles.useWaysSec}>
      <div className={styles.useWaysContainer}>
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
              <img src={`${imgPath}${way.iconURL}`} alt={way.alt} />
              <h3>{way.header}</h3>
              <p>{way.text}</p>
              <Link to={way.btnLink} className={styles.useWaysBtn}>
                {way.btnText}
                <img
                  className={styles.useWaysBtnArrow}
                  src={`${imgPath}icon-arrow-long-right.svg`}
                  alt="arrow-right"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseWaysSec;
