import React, { useRef, useState } from 'react';
import styles from './ClickOpenElement.module.sass';
import classNames from 'classnames';
import { GoPlus } from 'react-icons/go';

function ClickOpenElement({ data, imgPath }) {
  const { question, answer, list } = data;
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const containerClass = classNames(styles.container, {
    [styles.active]: isOpen,
  });

  const contentContainerStyle = {
    maxHeight: isOpen ? contentRef.current.scrollHeight : 0,
  };

  const getList = () => {
    if (!list) return null;
    return (
      <ul className={styles.list}>
        {list.map((li, i) => (
          <li
            key={i}
            dangerouslySetInnerHTML={{ __html: li }}
            className={styles.listItem}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className={containerClass}>
      <button className={styles.header} onClick={clickHandler}>
        {question}
        <GoPlus className={styles.plusIcon} />
      </button>
      <div
        className={styles.contentContainer}
        style={contentContainerStyle}
        ref={contentRef}
      >
        <div className={styles.contentWrapper}>
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
          {getList()}
        </div>
      </div>
    </div>
  );
}

export default ClickOpenElement;
