import React, { useState } from 'react';
import styles from './FAQSec.module.sass';
import { FAQ_SECTIONS } from '../HowItWorksData';
import ClickOpenElement from '../ClickOpenElement/ClickOpenElement';
import classNames from 'classnames';

function FAQSec({ imgPath }) {
  const getId = (i) => `section${i}`;
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  const getNavClassnames = (index) => {
    console.log(index, activeNavIndex, index === activeNavIndex);
    return classNames(styles.faqNavItem, {
      [styles.activeNav]: index === activeNavIndex,
    });
  };

  const clickHandler = (index) => {
    setActiveNavIndex(index);
  };

  return (
    <section className={styles.faqSec}>
      <div className={styles.faqContainer}>
        <div className={styles.faqHead}>
          <h3 className={styles.faqHeader}>Frequently Asked Questions</h3>
        </div>
        <nav className={styles.faqNav} id={styles.nav}>
          {FAQ_SECTIONS.map((sec, i) => (
            <a
              key={i}
              href={`#section${i}`}
              className={getNavClassnames(i)}
              onClick={() => clickHandler(i)}
            >
              {sec.header}
            </a>
          ))}
        </nav>
        <div className={styles.faqContainer}>
          {FAQ_SECTIONS.map((sec, i) => (
            <section key={i} id={getId(i)} className={styles.faqSection}>
              <h4 className={styles.faqSectionHeader}>{sec.header}</h4>
              <ul className={styles.faqList}>
                {sec.questions.map((q, i) => (
                  <li key={i} className={styles.faqListItem}>
                    <ClickOpenElement data={q} imgPath={imgPath} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSec;
