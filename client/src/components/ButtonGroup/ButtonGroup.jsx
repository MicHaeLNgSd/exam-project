import React from 'react';
import styles from './ButtonGroup.module.sass';
import RadioButton from './RadioButton/RadioButton';

const initClasses = {
  groupContainer: styles.groupContainer,
  groupHeader: styles.groupHeader,
  btnWrapper: styles.btnWrapper,
};

function ButtonGroup({ name, header, buttons = [], classes = {} }) {
  const newClasses = { ...initClasses, ...classes };
  const { groupContainer, groupHeader, btnWrapper, ...btnClasses } = newClasses;

  return (
    <div className={groupContainer}>
      <span className={groupHeader}>{header}</span>
      <div className={btnWrapper}>
        {buttons.map((b, i) => (
          <RadioButton key={i} name={name} button={b} classes={btnClasses} />
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
