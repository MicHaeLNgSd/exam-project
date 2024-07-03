import React from 'react';
import styles from './HowWorksSec.module.sass';
import classNames from 'classnames';

function HowWorksSec({ imgPath }) {
  return (
    <section className={styles.howWorksSec}>
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

        <a className={styles.howItWorksBtn} href="https://vimeo.com/368584367">
          <i className={classNames('fas fa-play', styles.playBtn)} />
          Play Video
        </a>
      </div>
      <img
        src={`${imgPath}app-user.svg`}
        alt="app-user"
        className={styles.howWorksImg}
      />
    </section>
  );
}

export default HowWorksSec;
