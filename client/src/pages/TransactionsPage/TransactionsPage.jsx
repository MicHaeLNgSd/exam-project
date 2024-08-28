import React, { useCallback, useEffect } from 'react';
import moment from 'moment';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerLoader from '../../components/Spinner/Spinner';
import { getUserTransactions } from '../../store/slices/transactionsSlice';
import styles from './TransactionsPage.module.sass';
import TryAgain from '../../components/TryAgain/TryAgain';

function TransactionsPage() {
  const dispatch = useDispatch();
  const { isFetching, error, transactions } = useSelector(
    (state) => state.transactionsStore
  );

  const tryGetTransactions = useCallback(() => {
    dispatch(getUserTransactions());
  }, [dispatch]);

  useEffect(() => {
    tryGetTransactions();
  }, [tryGetTransactions]);

  const renderData = () => {
    if (isFetching) return <SpinnerLoader />;
    if (error) return <TryAgain getData={tryGetTransactions} />;
    if (transactions.length === 0 && !isFetching)
      return (
        <div className={styles.notFound}>
          There is no transaction at the moment
        </div>
      );
    return (
      <table className={styles.transitionsTable}>
        <caption>Finance Operations</caption>
        <thead>
          <tr>
            <th>Operation Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.operationType}</td>
              <td>{t.amount}</td>
              <td>{moment(t.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Header />
      <main className={styles.main}>{renderData()}</main>
    </>
  );
}

export default TransactionsPage;
