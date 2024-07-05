import React from 'react';
import styles from '../RegistrationFooter/RegistrationFooter.module.sass';

function RegistrationFooterItem({ item: { header, article } }) {
  return (
    <>
      <div className={styles.headerArticle}>{header}</div>
      <div
        className={styles.article}
        dangerouslySetInnerHTML={{ __html: article }}
      ></div>
    </>
  );
}

export default RegistrationFooterItem;
