import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './OffersReviewItem.module.sass';
import CONSTANTS from '../../../../constants';
import { changeShowImage } from '../../../../store/slices/contestByIdSlice';
import {
  deleteOffer,
  setOfferReviewStatus,
} from '../../../../store/slices/offersSlice';

function OffersReviewItem({ offer }) {
  const { id, text, fileName, Contest } = offer;
  const {
    contestType,
    typeOfName,
    brandStyle,
    typeOfTagline,
    title,
    nameVenture,
    styleName,
    industry,
    fileName: contestFileName,
    originalFileName: contestOriginalFileName,
  } = Contest;

  const dispatch = useDispatch();

  const setStatus = (command) => {
    dispatch(setOfferReviewStatus({ command, offerId: id }));
    dispatch(deleteOffer({ id }));
  };
  const approveHandler = () => setStatus('approve');
  const denyHandler = () => setStatus('deny');

  return (
    <tr key={id}>
      <td>
        {contestType} / {typeOfName || brandStyle || typeOfTagline}
      </td>
      <td>
        <p className={styles.title}>Title: {title}</p>
        {nameVenture && <p>Venture: {nameVenture}</p>}
        {styleName && <p>Style: {styleName}</p>}
        <p>{industry}</p>
        <a
          target="_blank"
          href={`${CONSTANTS.publicContestsURL}${contestFileName}`}
          download={contestOriginalFileName}
          rel="noreferrer"
        >
          {contestOriginalFileName}
        </a>
      </td>
      <td>
        {fileName ? (
          <img
            onClick={() =>
              dispatch(
                changeShowImage({
                  imagePath: fileName,
                  isShowOnFull: true,
                })
              )
            }
            className={styles.responseLogo}
            src={`${CONSTANTS.publicContestsURL}${fileName}`}
            alt="logo"
          />
        ) : (
          <p className={styles.response}>{text}</p>
        )}
      </td>
      <td className={styles.btnTd}>
        <button className={styles.approveBtn} onClick={approveHandler}>
          Approve
        </button>
        <button className={styles.denyBtn} onClick={denyHandler}>
          Deny
        </button>
      </td>
    </tr>
  );
}

export default OffersReviewItem;
