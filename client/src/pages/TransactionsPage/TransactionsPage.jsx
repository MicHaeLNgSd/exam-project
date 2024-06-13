import React, { useEffect } from 'react';
import moment from 'moment';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import SpinnerLoader from '../../components/Spinner/Spinner';
import { getUserTransactions } from '../../store/slices/transactionsSlice';
import styles from './TransactionsPage.module.sass';

function TransactionsPage({ transactions, isFetching, error, get }) {
  useEffect(() => {
    get();
  }, []);

  if (isFetching)
    return (
      <>
        <Header />
        <SpinnerLoader />
      </>
    );
  if (error) return <Header />;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <table className={styles.transitionsTable}>
          <caption>Finance Operations</caption>
          <thead>
            <th>Operation Type</th>
            <th>Amount</th>
            <th>Date</th>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.operationType}</td>
                <td>{t.amount}</td>
                <td>{moment(t.createdAt).format('DD/MM/YYYY hh:mm:ss')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

const mapStateToProps = ({ transactionsStore }) => transactionsStore;

const mapDispatchToProps = (dispatch) => ({
  get: () => dispatch(getUserTransactions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);
