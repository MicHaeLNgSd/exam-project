import React from 'react';
import styles from './OffersReviewList.module.sass';
import OffersReviewItem from './OffersReviewItem/OffersReviewItem';

function OffersReviewList({ offers }) {
  return (
    <table className={styles.table}>
      <caption>OffersReview</caption>
      <thead>
        <tr>
          <th>Type</th>
          <th>Contest</th>
          <th>Offer</th>
          <th>Buttons</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((o) => (
          <OffersReviewItem key={o.id} offer={o} />
        ))}
      </tbody>
    </table>
  );
}

export default OffersReviewList;
