import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import SpinnerLoader from '../../components/Spinner/Spinner';
import { getUserTransactions } from '../../store/slices/transactionsSlice';

function TransactionsPage({ transactions, isFetching, error, get }) {
  useEffect(() => {
    get();
  }, []);

  if (isFetching) return <SpinnerLoader />;
  if (error) return null;

  return (
    <>
      <Header />
      <main>
        <table>
          <caption>Finance Operations</caption>
          <thead>
            <tr key={1}>Operation Type</tr>
            <tr key={2}>Amount</tr>
            <tr key={3}>Date</tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.operationType}</td>
                <td>{t.amount}</td>
                <td>{t.createdAt}</td>
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
