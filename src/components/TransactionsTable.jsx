// @flow
import * as React from 'react';
import { css } from 'emotion';
import { Table } from 'bloomer';
import { formatDate, formatMoney } from '../utils/formatUtils';
import type { Transaction } from '../types';

type Props = {
  transactions: Array<Transaction>,
  onRowClick: (selectedItem: Transaction) => void,
};

const TransactionsTable = ({ transactions, onRowClick }: Props) => (
  <Table isStriped>
    <thead>
      <tr>
        <th>Date</th>
        <th>To/From</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(transaction => (
        <tr
          key={transaction.id}
          onClick={() => onRowClick(transaction)}
          className={css`
            &:hover {
              background-color: hsl(171, 100%, 41%) !important;
              cursor: pointer;
            }
          `}
        >
          <td>{formatDate(transaction.transactionDate)}</td>
          <td>{transaction.toFrom}</td>
          <td>{transaction.type}</td>
          <td className={transaction.amount < 0 ? 'has-text-danger' : ''}>
            {formatMoney(transaction.amount)}
          </td>
          <td>{transaction.description}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default TransactionsTable;
