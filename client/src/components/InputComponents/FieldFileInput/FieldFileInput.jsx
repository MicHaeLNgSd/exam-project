import React, { useRef } from 'react';
import { useField } from 'formik';
import { FaRegTimesCircle } from 'react-icons/fa';

const FieldFileInput = ({ classes, name }) => {
  const {
    fileUploadContainer,
    labelClass,
    fileNameClass,
    fileInput,
    closeIcon,
  } = classes;
  const [{ value, ...field }, , helpers] = useField(name);
  const fileInputRef = useRef(null);

  const getFileName = () => (value ? value.name : '');

  const onChange = ({ target }) => {
    const file = target.files[0];
    helpers.setValue(file || value);
  };

  const clearFile = () => {
    helpers.setValue(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className={fileUploadContainer}>
      <label className={labelClass}>
        Choose file
        <input
          {...field}
          ref={fileInputRef}
          className={fileInput}
          type="file"
          onChange={onChange}
        />
      </label>
      <span id="fileNameContainer" className={fileNameClass}>
        {getFileName()}
      </span>
      {value && <FaRegTimesCircle className={closeIcon} onClick={clearFile} />}
    </div>
  );
};

export default FieldFileInput;
