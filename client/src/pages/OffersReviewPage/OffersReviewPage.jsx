import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { clearOffers, getOffers } from '../../store/slices/offersSlice';
import TryAgain from '../../components/TryAgain/TryAgain';
import Spinner from '../../components/Spinner/Spinner';
import OffersReviewList from './OffersReviewList/OffersReviewList';
import Lightbox from 'react-18-image-lightbox';
import CONSTANTS from '../../constants';
import { changeShowImage } from '../../store/slices/contestByIdSlice';
import styles from './OffersReviewPage.module.sass';

function OffersReviewPage() {
  const dispatch = useDispatch();
  const { isFetching, error, offers, haveMore } = useSelector(
    (state) => state.offersStore
  );
  const { isShowOnFull, imagePath } = useSelector(
    (state) => state.contestByIdStore
  );

  const loadMore = (startFrom = 0, limit = 8) => {
    dispatch(
      getOffers({
        limit,
        offset: startFrom,
        status: CONSTANTS.OFFER_STATUS_REVIEWING,
      })
    );
  };

  const scrollHandler = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      if (haveMore) {
        loadMore(offers.length);
      }
    }
  };

  useEffect(() => {
    if (offers.length > 0 && offers.length < 8 && haveMore) {
      loadMore(offers.length);
    }
  }, [offers, haveMore]); //, loadMore

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [offers]);

  useEffect(() => {
    dispatch(clearOffers());
    dispatch(getOffers({ limit: 8, status: CONSTANTS.OFFER_STATUS_REVIEWING }));
  }, [dispatch]);

  const tryGetOffers = () => {
    dispatch(getOffers({ limit: 8, status: CONSTANTS.OFFER_STATUS_REVIEWING }));
  };

  const renderData = () => {
    if (error) return <TryAgain getData={tryGetOffers} />;
    if (offers.length === 0 && !isFetching) return <p>No offers to review</p>;
    return <OffersReviewList offers={offers} />;
  };

  return (
    <div>
      {isShowOnFull && (
        <Lightbox
          mainSrc={`${CONSTANTS.publicContestsURL}${imagePath}`}
          onCloseRequest={() =>
            dispatch(changeShowImage({ isShowOnFull: false, imagePath: null }))
          }
        />
      )}
      <Header />
      <main className={styles.main}>
        {renderData()}
        {isFetching && <Spinner />}
      </main>
    </div>
  );
}

export default OffersReviewPage;
