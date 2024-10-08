import React from 'react';
import { Field, ErrorMessage } from 'formik';
import classNames from 'classnames';

const FormInput = ({
  classes = {},
  label,
  name,
  type = 'text',
  isError = true,
  ...rest
}) => (
  <Field name={name}>
    {(props) => {
      const {
        field,
        meta: { touched, error },
      } = props;

      const inputClassName = classNames(classes.input, {
        [classes.notValid]: touched && error,
        [classes.valid]: touched && !error,
      });
      return (
        <div className={classes.container}>
          <input
            type={type}
            {...field}
            placeholder={label}
            className={inputClassName}
            autoComplete="on"
            {...rest}
          />
          {isError && (
            <ErrorMessage
              name={name}
              component="span"
              className={classes.warning}
            />
          )}
        </div>
      );
    }}
  </Field>
);

export default FormInput;
