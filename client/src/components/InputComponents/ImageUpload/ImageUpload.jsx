import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

const ImageUpload = (props) => {
  const [{ value, ...field }, meta, helpers] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;

  const onChange = ({ target }) => {
    const node = window.document.getElementById('imagePreview');
    const file = target.files[0];
    const imageType = /image.*/;

    if (!file.type.match(imageType)) {
      target.value = '';
    } else {
      helpers.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...field}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Chose file</label>
      </div>
      <img
        id="imagePreview"
        className={classNames({ [imgStyle]: !!field.value })}
        alt="user"
      />
    </div>
  );
};

export default ImageUpload;
