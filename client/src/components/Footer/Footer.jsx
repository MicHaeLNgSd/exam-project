import React from 'react';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';

const Footer = () => {
  const topFooterItemsRender = ({ title, items }) => (
    <div key={title}>
      <h4>{title}</h4>
      {items.map((i) => (
        <a key={i} href="https://google.com">
          {i}
        </a>
      ))}
    </div>
  );

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div>{CONSTANTS.FOOTER_ITEMS.map((i) => topFooterItemsRender(i))}</div>
      </div>
    </div>
  );
};

export default Footer;
