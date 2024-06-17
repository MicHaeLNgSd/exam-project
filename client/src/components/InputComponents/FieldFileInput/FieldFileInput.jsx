import React from 'react';
import { Field, useField } from 'formik';

const FieldFileInput = ({ classes, name }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  const [{ value, ...field }, meta, helpers] = useField(name);

  //TODO think about: const getFileName = () => value?.name ?? '';
  const getFileName = () => {
    return value ? value.name : '';
  };

  const onChange = ({ target }) => {
    const file = target.files[0];
    helpers.setValue(file);
  };

  return (
    <div className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>
      <span id="fileNameContainer" className={fileNameClass}>
        {getFileName()}
      </span>
      <input
        {...field}
        className={fileInput}
        id="fileInput"
        type="file"
        onChange={onChange}
      />
    </div>
  );
};

export default FieldFileInput;
