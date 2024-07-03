import React from 'react';
import styles from './NamingStepsSec.module.sass';
import { NAMING_CONTESTS_STEPS } from '../HowItWorksData';

function NamingStepsSec({ imgPath }) {
  return (
    <section className={styles.namingStepsSec}>
      <div className={styles.namingStepsHead}>
        <img
          src={`${imgPath}prize.svg`}
          alt="prize"
          className={styles.namingStepsImg}
        />
        <h3 className={styles.namingStepsHeader}>
          How Do Naming Contests Work?
        </h3>
      </div>
      <div className={styles.namingStepsList}>
        {NAMING_CONTESTS_STEPS.map((step, index) => (
          <div key={index} className={styles.namingStepsItem}>
            <span className={styles.namingStepsNumber}>Step {index + 1}</span>
            <p>{step}</p>
            <span className={styles.stepArrow}>
              <img
                className={styles.namingStepsArrow}
                src={`${imgPath}arrow-right-purpule.svg`}
                alt="arrow-right"
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NamingStepsSec;
