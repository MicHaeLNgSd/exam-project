import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';

const ImageUpload = ({ name, classes }) => {
  const [{ value, ...field }, , helpers] = useField(name);
  const { uploadContainer, inputContainer, imgStyle, error } = classes;
  const [imgSrc, setImgSrc] = useState(value);
  const fileInputRef = useRef(null);

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
    if (!value) {
      setImgSrc('');
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  }, [value]);

  return (
    <div className={uploadContainer}>
      {imgSrc && <img src={imgSrc} className={imgStyle} alt="imagePreview" />}
      <div className={inputContainer}>
        <span className={error}>
          Support only images (*.png, *.gif, *.jpeg)
        </span>
        <label>
          Chose file
          <input
            {...field}
            ref={fileInputRef}
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
