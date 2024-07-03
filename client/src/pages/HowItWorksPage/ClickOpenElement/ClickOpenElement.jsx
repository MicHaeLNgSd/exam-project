import React, { useRef, useState } from 'react';
import styles from './ClickOpenElement.module.sass';
import classNames from 'classnames';

function ClickOpenElement({ data, imgPath }) {
  const { question, answer } = data;
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const containerClass = classNames(styles.container, {
    [styles.active]: isOpen,
  });

  const contentWrapperStyle = {
    maxHeight: isOpen ? contentRef.current.scrollHeight : 0,
  };

  return (
    <div className={containerClass}>
      <button className={styles.header} onClick={clickHandler}>
        {question}
      </button>
      <div
        className={styles.contentWrapper}
        style={contentWrapperStyle}
        ref={contentRef}
      >
        <p className={styles.text}>{answer}</p>
      </div>
    </div>
  );
}

export default ClickOpenElement;
