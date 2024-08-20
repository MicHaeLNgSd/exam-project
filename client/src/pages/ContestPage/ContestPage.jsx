import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import LightBox from 'react-18-image-lightbox';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-18-image-lightbox/style.css';
import Error from '../../components/Error/Error';
import { findConversationInfo, sortByArr } from '../../utils/functions';

const orderArr = [
  CONSTANTS.OFFER_STATUS_REVIEWING,
  CONSTANTS.OFFER_STATUS_PENDING,
  CONSTANTS.OFFER_STATUS_WON,
  CONSTANTS.OFFER_STATUS_DENIED,
  CONSTANTS.OFFER_STATUS_REJECTED,
];

const ContestPage = ({
  contestByIdStore,
  chatStore,
  userStore,
  changeEditContest,
  getData,
  changeShowImage,
  changeContestViewMode,
  clearSetOfferStatusError,
  goToExpandedDialog,
  match,
  setOfferStatus,
}) => {
  const { role } = userStore.data;
  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;
  const sortedOffers = sortByArr(offers, 'status', orderArr);

  useEffect(() => {
    getData({ contestId: match.params.id });
    return () => changeEditContest(false);
  }, [getData, match.params.id, changeEditContest]);

  const setOffersList = () => {
    const offerList = sortedOffers.map((o) => (
      <OfferBox
        data={o}
        key={o.id}
        needButtons={needButtons}
        setOfferStatus={changeOfferStatus}
        contestType={contestData.contestType}
        date={new Date()}
      />
    ));

    if (offerList.length === 0)
      return (
        <div className={styles.notFound}>
          There is no suggestion at the moment
        </div>
      );

    return offerList;
  };

  const needButtons = (offerStatus) => {
    const contestCreatorId = contestData.User.id;
    const userId = userStore.data.id;
    const contestStatus = contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const changeOfferStatus = (creatorId, offerId, command) => {
    clearSetOfferStatusError();
    const { id, orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    setOfferStatus(obj);
  };

  const goChat = () => {
    const { User } = contestData;
    const { messagesPreview } = chatStore;
    const { id } = userStore.data;
    goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(messagesPreview, id, User.id),
    });
  };

  return (
    <div>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.publicContestsURL}${imagePath}`}
          onCloseRequest={() =>
            changeShowImage({ isShowOnFull: false, imagePath: null })
          }
        />
      )}
      <Header />
      {error ? (
        <div className={styles.tryContainer}>
          <TryAgain getData={getData} />
        </div>
      ) : isFetching ? (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.buttonsContainer}>
              <span
                onClick={() => changeContestViewMode(true)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </span>
              <span
                onClick={() => changeContestViewMode(false)}
                className={classNames(styles.btn, {
                  [styles.activeBtn]: !isBrief,
                })}
              >
                Offer
              </span>
            </div>
            {isBrief ? (
              <Brief contestData={contestData} role={role} goChat={goChat} />
            ) : (
              <div className={styles.offersContainer}>
                {role === CONSTANTS.CREATOR &&
                  contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearSetOfferStatusError}
                  />
                )}
                <div className={styles.offers}>{setOffersList()}</div>
              </div>
            )}
          </div>
          <ContestSideBar contestData={contestData} offers={sortedOffers} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
