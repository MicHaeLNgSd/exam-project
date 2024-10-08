import React from 'react';
import { FaPlay } from 'react-icons/fa';
import styles from './HowWorksSec.module.sass';

function HowWorksSec({ imgPath }) {
  return (
    <section className={styles.howWorksSec}>
      <div className={styles.howWorksContainter}>
        <div className={styles.howWorksInfo}>
          <h4 className={styles.howWorksTag}>World's #1 Naming Platform</h4>
          <div className={styles.howWorksInfo}>
            <h1 className={styles.howWorksHeader}>How Does Atom Work?</h1>
            <p className={styles.howWorksText}>
              Atom helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
          </div>

          <a
            className={styles.howItWorksBtn}
            href="https://vimeo.com/368584367"
          >
            <FaPlay className={styles.playBtn} />
            Play Video
          </a>
        </div>
        <img
          src={`${imgPath}app-user.svg`}
          alt="app-user"
          className={styles.howWorksImg}
        />
      </div>
    </section>
  );
}

export default HowWorksSec;
