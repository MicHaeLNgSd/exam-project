import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

class CustomerDashboard extends React.Component {
  loadMore = (startFrom) => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidMount() {
    this.getContests();
  }

  getContests = () => {
    this.props.getContests({
      limit: 8,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.customerFilter !== prevProps.customerFilter) {
      this.getContests();
    }
  }

  goToExtended = (contestId) => {
    this.props.history.push(`/contest/${contestId}`);
  };

  setContestList = () => {
    const { contests } = this.props;
    const array = contests.map((c) => (
      <ContestBox key={c.id} data={c} goToExtended={this.goToExtended} />
    ));
    return array;
  };

  componentWillUnmount() {
    this.props.clearContestsList();
  }

  tryToGetContest = () => {
    this.props.clearContestsList();
    this.getContests();
  };

  clickHandler = (filter) => {
    if (this.props.customerFilter !== filter) {
      this.props.newFilter(filter);
    }
  };

  render() {
    const { error, haveMore } = this.props;
    const { customerFilter } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <span className={styles.headerFilter}>Filter Results</span>
          <div className={styles.inputsContainer}>
            <div
              onClick={() => this.clickHandler(CONSTANTS.CONTEST_STATUS.ACTIVE)}
              className={classNames(styles.filter, {
                [styles.activeFilter]:
                  CONSTANTS.CONTEST_STATUS.ACTIVE === customerFilter,
              })}
            >
              Active Contests
            </div>
            <div
              onClick={() =>
                this.clickHandler(CONSTANTS.CONTEST_STATUS.FINISHED)
              }
              className={classNames(styles.filter, {
                [styles.activeFilter]:
                  CONSTANTS.CONTEST_STATUS.FINISHED === customerFilter,
              })}
            >
              Completed Contests
            </div>
            <div
              onClick={() =>
                this.clickHandler(CONSTANTS.CONTEST_STATUS.PENDING)
              }
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
            <TryAgain getData={this.tryToGetContest} />
          ) : (
            <ContestsContainer
              isFetching={this.props.isFetching}
              loadMore={this.loadMore}
              history={this.props.history}
              haveMore={haveMore}
            >
              {this.setContestList()}
            </ContestsContainer>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(
      getContests({ requestData: data, role: CONSTANTS.USER_ROLE.CUSTOMER })
    ),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
