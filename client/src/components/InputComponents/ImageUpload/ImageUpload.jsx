import React, { useEffect, useState } from 'react';
import { useField } from 'formik';

const ImageUpload = ({ name, classes }) => {
  const [{ value, ...field }, , helpers] = useField(name);
  const { uploadContainer, inputContainer, imgStyle, error } = classes;
  const [imgSrc, setImgSrc] = useState(value);

  const onChange = ({ target }) => {
    const file = target.files[0];
    const imageType = /image.*/;

    if (!file?.type.match(imageType)) {
      helpers.setValue(null);
      return setImgSrc('');
    }

    helpers.setValue(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImgSrc(reader.result);
  };

  useEffect(() => {
    if (!value) setImgSrc('');
  }, [value]);

  return (
    <div className={uploadContainer}>
      {imgSrc && <img src={imgSrc} className={imgStyle} alt="imagePreview" />}
      <div className={inputContainer}>
        <span className={error}>
          Support only images (*.png, *.gif, *.jpeg)
        </span>
        <input
          {...field}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Chose file</label>
      </div>
    </div>
  );
};

export default ImageUpload;
