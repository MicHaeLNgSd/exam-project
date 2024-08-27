import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import ContestsContainer from '../Contest/ContestsContainer/ContestsContainer';
import ContestBox from '../Contest/ContestBox/ContestBox';
import styles from './CreatorDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import CONSTANTS from '../../constants';

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

const CreatorDashboard = ({
  creatorFilter,
  dataForContest,
  getDataForContest,
  location,
  history,
  getContestsData,
  clearContestsList,
  contests,
  error,
  isFetching,
  haveMore,
  newFilter,
}) => {
  const renderSelectType = () => {
    return (
      <select
        name={'typeIndex'}
        onChange={({ target }) =>
          changePredicate({
            name: 'typeIndex',
            value: types.indexOf(target.value),
          })
        }
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {types.slice(1).map((el, i) => (
          <option key={i} value={el}>
            {el}
          </option>
        ))}
      </select>
    );
  };

  const getContests = useCallback(
    (filter) => {
      getContestsData({
        limit: 8,
        offset: 0,
        ...filter,
      });
    },
    [getContestsData]
  );

  const renderIndustryType = () => {
    const industry = dataForContest.data?.industry || [];

    return (
      <select
        name={'industry'}
        onChange={({ target }) =>
          changePredicate({
            name: 'industry',
            value: target.value,
          })
        }
        value={creatorFilter.industry}
        className={styles.input}
      >
        <option key={0} value={null}>
          Choose industry
        </option>
        {industry.map((industry, i) => (
          <option key={i + 1} value={industry}>
            {industry}
          </option>
        ))}
      </select>
    );
  };

  const parseUrlForParams = useCallback(
    (search) => {
      const obj = queryString.parse(search);
      const filter = {
        typeIndex: obj.typeIndex || 1,
        contestId: obj.contestId ? obj.contestId : '',
        industry: obj.industry ? obj.industry : '',
        awardSort: obj.awardSort || 'asc',
        ownEntries:
          typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
      };
      newFilter(filter);
      clearContestsList();
      getContests(filter);
    },
    [clearContestsList, getContests, newFilter]
  );

  const getPredicateOfRequest = () => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  useEffect(() => {
    getDataForContest();
    return () => clearContestsList();
  }, [getDataForContest, clearContestsList]);

  useEffect(() => {
    parseUrlForParams(location.search);
  }, [location.search, parseUrlForParams]);

  const changePredicate = ({ name, value }) => {
    const filterObj = { [name]: value === 'Choose industry' ? null : value };

    newFilter(filterObj);
    parseParamsToUrl({ ...creatorFilter, ...filterObj });
  };

  const parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    Object.entries(creatorFilter).forEach(([key, value]) => {
      if (value) obj[key] = value;
    });
    history.push(`/dashboard?${queryString.stringify(obj)}`);
  };

  const loadMore = (startFrom) => {
    getContests({
      limit: 8,
      offset: startFrom,
      ...getPredicateOfRequest(),
    });
  };

  const goToExtended = (contestId) => {
    history.push(`/contest/${contestId}`);
  };

  const setContestList = () => {
    return contests.map((c) => (
      <ContestBox key={c.id} data={c} goToExtended={goToExtended} />
    ));
  };

  const tryLoadAgain = () => {
    clearContestsList();
    getContests({
      limit: 8,
      offset: 0,
      ...getPredicateOfRequest(),
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            onClick={() =>
              changePredicate({
                name: 'ownEntries',
                value: !creatorFilter.ownEntries,
              })
            }
            className={classNames(styles.myEntries, {
              [styles.activeMyEntries]: creatorFilter.ownEntries,
            })}
          >
            My Entries
          </div>
          <div className={styles.inputContainer}>
            <span>By contest type</span>
            {renderSelectType()}
          </div>
          <div className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="text"
              onChange={({ target: { value } }) => {
                if (/^[0-9]*$/.test(value)) {
                  changePredicate({ name: 'contestId', value });
                }
              }}
              name="contestId"
              value={creatorFilter.contestId}
              className={styles.input}
            />
          </div>
          {!isFetching && (
            <div className={styles.inputContainer}>
              <span>By industry</span>
              {renderIndustryType()}
            </div>
          )}
          <div className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              name={'awardSort'}
              onChange={({ target }) =>
                changePredicate({
                  name: 'awardSort',
                  value: target.value,
                })
              }
              value={creatorFilter.awardSort}
              className={styles.input}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>
      {error ? (
        <div className={styles.messageContainer}>
          <TryAgain getData={tryLoadAgain} />
        </div>
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
  );
};

const mapStateToProps = (state) => {
  const { contestsList, dataForContest } = state;
  return { ...contestsList, dataForContest };
};

const mapDispatchToProps = (dispatch) => ({
  getContestsData: (data) =>
    dispatch(
      getContests({ requestData: data, role: CONSTANTS.USER_ROLE.CREATOR })
    ),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
  getDataForContest: () => dispatch(getDataForContest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard)
);
