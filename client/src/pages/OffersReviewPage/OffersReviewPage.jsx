import React, { useCallback, useEffect } from 'react';
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

  const loadMore = useCallback(
    (startFrom = 0, limit = 8) => {
      dispatch(
        getOffers({
          limit,
          offset: startFrom,
          status: CONSTANTS.OFFER_STATUS.REVIEWING,
        })
      );
    },
    [dispatch]
  );

  const scrollHandler = useCallback(() => {
    const isAtScrollEnd =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1;
    if (haveMore && isAtScrollEnd) {
      loadMore(offers.length);
    }
  }, [haveMore, offers, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  useEffect(() => {
    if (offers.length > 0 && offers.length < 8 && haveMore) {
      loadMore(offers.length);
    }
  }, [offers, haveMore, loadMore]);

  const tryGetOffers = useCallback(() => {
    dispatch(getOffers({ limit: 8, status: CONSTANTS.OFFER_STATUS.REVIEWING }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearOffers());
    tryGetOffers();
  }, [dispatch, tryGetOffers]);

  const renderData = () => {
    if (error) return <TryAgain getData={tryGetOffers} />;
    if (offers.length === 0 && !isFetching)
      return (
        <div className={styles.notFound}>There is no offer at the moment</div>
      );
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
