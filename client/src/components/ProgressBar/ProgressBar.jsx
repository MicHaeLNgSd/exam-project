import React from 'react';
import styles from './ProgressBar.module.sass';
import classNames from 'classnames';

const ProgressBar = ({ currentStep }) => {
  const renderProgress = () => {
    const array = [];
    for (let i = 1; i <= 3; i++) {
      array.push(renderBar(i));
    }
    return array;
  };

  const renderBar = (count) => {
    const getProgressState = () => {
      if (count > currentStep) return 'NotActive';
      if (count === currentStep) return 'Active';
      return 'Complete';
    };

    const classOuter = classNames(styles[`outer${getProgressState()}`]);
    const classInner = classNames(styles[`inner${getProgressState()}`]);
    const classProgress = count === currentStep ? styles.progressContainer : '';

    return (
      <div className={classProgress} key={count}>
        <div className={styles.progressBarContainer}>
          <div className={classOuter}>
            <div className={classInner} />
          </div>
          {count !== 3 && <div className={styles.lineBar} />}
        </div>
      </div>
    );
  };

  return <div className={styles.progressBarContainer}>{renderProgress()}</div>;
};
export default ProgressBar;
