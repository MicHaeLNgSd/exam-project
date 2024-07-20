import React from 'react';
import styles from './RadioButton.module.sass';
import { FaCheck } from 'react-icons/fa6';
import { Field } from 'formik';

const initClasses = {
  btnContainer: styles.btnContainer,
  radioBtn: styles.radioBtn,
  btnWrapper: styles.btnWrapper,
  btnHeader: styles.btnHeader,
  btnText: styles.btnText,
  checkIcon: styles.checkIcon,
  recommend: styles.recommend,
};

function RadioButton({ name, button, classes = {} }) {
  const { header, text, value, isRecommended } = button;
  const newClasses = { ...initClasses, ...classes };
  const {
    btnContainer,
    radioBtn,
    btnWrapper,
    btnHeader,
    btnText,
    checkIcon,
    recommend,
  } = newClasses;

  return (
    <label className={btnContainer}>
      <Field type="radio" name={name} value={value} className={radioBtn} />
      <div className={btnWrapper}>
        <h3 className={btnHeader}>{header}</h3>
        <p className={btnText}>{text}</p>
        <FaCheck className={checkIcon} />
        {isRecommended && <span className={recommend}>Recommended</span>}
      </div>
    </label>
  );
}

export default RadioButton;
