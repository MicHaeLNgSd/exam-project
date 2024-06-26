import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../RegistrationFooter/RegistrationFooter.module.sass';

function RegistrationFooterItem({ item }) {
  const { header, article } = item;

  const getArticle = (article) => {
    if (typeof article === 'string') return article;
    if (typeof article !== 'object') return null;

    return article.map(({ text, span, end, link = '#' }, index) => (
      <React.Fragment key={index}>
        {text}{' '}
        {span && (
          <>
            <Link to={link} className={styles.orangeSpan}>
              {span}
            </Link>
            {end}{' '}
          </>
        )}
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className={styles.headerArticle}>{header}</div>
      <div className={styles.article}>{getArticle(article)}</div>
    </>
  );
}

export default RegistrationFooterItem;
