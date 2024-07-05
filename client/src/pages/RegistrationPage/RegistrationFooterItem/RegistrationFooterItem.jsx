import React from 'react';
import styles from '../RegistrationFooter/RegistrationFooter.module.sass';

function RegistrationFooterItem({ item }) {
  const { header, article } = item;
  console.log(article);

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
