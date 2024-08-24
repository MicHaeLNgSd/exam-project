import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../Contest/ContestsContainer/ContestsContainer';
import ContestBox from '../Contest/ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

const CustomerDashboard = ({
  getContestsData,
  customerFilter,
  clearContestsList,
  contests,
  error,
  haveMore,
  isFetching,
  history,
  newFilter,
}) => {
  const loadMore = (startFrom) => {
    getContestsData({
      limit: 8,
      offset: startFrom,
      contestStatus: customerFilter,
    });
  };

  const getContests = useCallback(() => {
    getContestsData({
      limit: 8,
      contestStatus: customerFilter,
    });
  }, [customerFilter, getContestsData]);

  useEffect(() => {
    getContests();
    return () => clearContestsList();
  }, [customerFilter, getContests, clearContestsList]);

  const goToExtended = (contestId) => {
    history.push(`/contest/${contestId}`);
  };

  const setContestList = () => {
    return contests.map((c) => (
      <ContestBox key={c.id} data={c} goToExtended={goToExtended} />
    ));
  };

  const tryToGetContest = () => {
    clearContestsList();
    getContests();
  };

  const clickHandler = (filter) => {
    if (customerFilter !== filter) newFilter(filter);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            onClick={() => clickHandler(CONSTANTS.CONTEST_STATUS.ACTIVE)}
            className={classNames(styles.filter, {
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS.ACTIVE === customerFilter,
            })}
          >
            Active Contests
          </div>
          <div
            onClick={() => clickHandler(CONSTANTS.CONTEST_STATUS.FINISHED)}
            className={classNames(styles.filter, {
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS.FINISHED === customerFilter,
            })}
          >
            Completed Contests
          </div>
          <div
            onClick={() => clickHandler(CONSTANTS.CONTEST_STATUS.PENDING)}
            className={classNames(styles.filter, {
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS.PENDING === customerFilter,
            })}
          >
            Inactive Contests
          </div>
        </div>
      </div>
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest} />
        ) : (
          <ContestsContainer
            isFetching={isFetching}
            loadMore={loadMore}
            history={history}
            haveMore={haveMore}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContestsData: (data) =>
    dispatch(
      getContests({ requestData: data, role: CONSTANTS.USER_ROLE.CUSTOMER })
    ),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
