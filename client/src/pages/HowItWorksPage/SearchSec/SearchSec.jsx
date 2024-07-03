import React from 'react';
import styles from './SearchSec.module.sass';
import { POPULAR_SEARCHES } from '../HowItWorksData';

function SearchSec({ imgPath }) {
  return (
    <section className={styles.searchSec}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputContainer}>
          <img
            src={`${imgPath}icon-search.svg`}
            alt="search"
            className={styles.glassIcon}
          ></img>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search Over 200,000+ Premium Names"
          />
          <button className={styles.searchBtn}>
            <img
              src={`${imgPath}icon-arrow-long-right.svg`}
              alt="arrow-right"
            />
          </button>
        </div>

        <div className={styles.popularSearches}>
          <span>Popular searches</span>
          {POPULAR_SEARCHES.map((s, index) => (
            <a href={s.url} key={index} className={styles.searchesLink}>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SearchSec;
