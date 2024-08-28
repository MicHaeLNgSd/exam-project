import React from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

const PayInput = (props) => {
  const { label, changeFocus, classes, isInputMask, mask } = props;
  const [field, meta] = useField(props.name);
  const { touched, error } = meta;

  const inputProps = {
    ...field,
    placeholder: label,
    className: classNames(classes.input, {
      [classes.notValid]: touched && error,
    }),
  };
  const focusHandler = () => changeFocus(field.name);

  const getInput = () => {
    if (field.name === 'sum') return <input {...inputProps} />;
    if (isInputMask) {
      return (
        <InputMask
          mask={mask}
          maskChar={null}
          {...inputProps}
          onFocus={focusHandler}
        />
      );
    }

    return <input {...inputProps} onFocus={focusHandler} />;
  };

  return (
    <div className={classes.container}>
      {getInput()}
      {touched && error && <span className={classes.error}>{error}!</span>}
    </div>
  );
};

export default PayInput;
