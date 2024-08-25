import React from 'react';
import styles from './BundleBox.module.sass';
import CONSTANTS from '../../constants';

const BundleBox = (props) => {
  const defaultPathToImages = `${CONSTANTS.STATIC_IMAGES_PATH}contestLabels/`;

  const renderImage = () => {
    return props.path.map((p, i) => (
      <img
        src={defaultPathToImages + p}
        key={i}
        className={styles.imgContainer}
        alt={p.replace(/.png/g, 'Contest')}
      />
    ));
  };

  const mouseOverHandler = () => {
    const element = document.getElementById(props.header);
    for (let i = 0; i < element.children[0].children.length; i++) {
      const child = element.children[0].children[i];
      child.src = `${defaultPathToImages}blue_${props.path[i]}`;
    }
  };

  const mouseOutHandler = () => {
    const element = document.getElementById(props.header);
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[i].src = defaultPathToImages + props.path[i];
    }
  };

  const getBackClass = () =>
    props.path.length === 1 ? ' ' : ` ${styles.combinedBundle}`;

  const { setBundle, header, describe } = props;
  return (
    <div
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      onClick={() => setBundle(header)}
      id={header}
      className={styles.bundleContainer + getBackClass()}
    >
      <div>{renderImage()}</div>
      <div className={styles.infoContainer}>
        <span className={styles.bundleName}>{header}</span>
        <hr />
        <span className={styles.infoBundle}>{describe}</span>
      </div>
    </div>
  );
};

export default BundleBox;
