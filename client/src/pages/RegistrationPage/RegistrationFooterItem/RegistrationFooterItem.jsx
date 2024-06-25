import React from 'react';
import styles from '../RegistrationFooter/RegistrationFooter.module.sass';

function RegistrationFooterItem({ item }) {
  const { header, article } = item;

  const getArticle = (article) => {
    if (typeof article === 'string') return article;

    return article.map(({ text, span, end, link }, index) => (
      <React.Fragment key={index}>
        {text && <span>{text} </span>}
        {span && (
          <>
            <span className={styles.orangeSpan}>{span}</span>
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
