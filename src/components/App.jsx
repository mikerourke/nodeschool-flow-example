// @flow
import * as React from 'react';
import { css } from 'emotion';
import { Title } from 'bloomer';
import TransactionsTable from './TransactionsTable';
import type { Transaction } from '../types';
import TransactionModal from './TransactionModal';

type State = {
  transactions: Array<Transaction>,
  activeTransaction: $Shape<Transaction>,
  modalActive: boolean,
};

class App extends React.Component<any, State> {
  state = {
    transactions: [],
    activeTransaction: {},
    modalActive: false,
  };

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions = () => {
    fetch('/transactions').then((result: Transaction[]) => {
      this.setState({ transactions: result });
    });
  };

  handleTransactionRowClick = (selectedItem: Transaction): void => {
    this.setState({
      activeTransaction: selectedItem,
      modalActive: true,
    });
  };

  handleModalCloseClick = (event: SyntheticEvent<HTMLElement>): void => {
    this.setState({ modalActive: false });
  };

  handleModalSaveClick = (updatedTransaction: Transaction): void => {
    fetch(`/transactions/${updatedTransaction.id}`, {
      method: 'PATCH',
      body: updatedTransaction,
    })
      .then(this.fetchTransactions)
      .then(() => {
        this.setState({
          modalActive: false,
          activeTransaction: {},
        });
      });
  };

  render() {
    return (
      <div
        className={css`
          margin: 8px;
        `}
      >
        <Title isSize={1}>Transactions</Title>
        <TransactionsTable
          transactions={this.state.transactions}
          onRowClick={this.handleTransactionRowClick}
        />
        <TransactionModal
          isActive={this.state.modalActive}
          transaction={this.state.activeTransaction}
          onCloseClick={this.handleModalCloseClick}
          onSaveClick={this.handleModalSaveClick}
        />
      </div>
    );
  }
}

export default App;
