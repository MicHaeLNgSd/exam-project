import React from 'react';
import Header from '../../components/Header/Header';

function TransactionsPage() {
  const transactions = [
    { amount: 10, operationType: 'INCOME', date: '2024-01-01' },
    { amount: 10, operationType: 'INCOME', date: '2024-02-02' },
  ];

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
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default TransactionsPage;
