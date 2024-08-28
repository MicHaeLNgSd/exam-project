import React from 'react';
import dataColumns from '../RegistrationData';
import styles from './RegistrationFooter.module.sass';
import RegistrationFooterItem from '../RegistrationFooterItem/RegistrationFooterItem';

function RegistrationFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.articlesMainContainer}>
        {dataColumns.map((col, index) => (
          <div key={index} className={styles.ColumnContainer}>
            {col.map((articleItem, index) => (
              <RegistrationFooterItem key={index} item={articleItem} />
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}

export default RegistrationFooter;
