// @flow
import * as React from 'react';
import {
  Button,
  Delete,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFooter,
  ModalCardHeader,
  ModalCardTitle,
} from 'bloomer';
import TransactionForm from './TransactionForm';
import type { Transaction } from '../types';
import { Component } from 'react';

type Props = {
  isActive: boolean,
  transaction: $Shape<Transaction>,
  onCloseClick: (event: SyntheticEvent<HTMLElement>) => void,
  onSaveClick: (updatedTransaction: Transaction) => void,
};

type State = {
  updatedTransaction: $Shape<Transaction>,
};

class TransactionModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      updatedTransaction: this.props.transaction,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.transaction.id !== this.state.updatedTransaction.id) {
      this.setState({ updatedTransaction: nextProps.transaction });
    }
  }

  handleFormInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const updatedTransaction = {
      ...this.state.updatedTransaction,
      [name]: value,
    };
    this.setState({ updatedTransaction });
  };

  handleSaveClick = () => {
    this.props.onSaveClick(this.state.updatedTransaction);
  };

  render() {
    let { onCloseClick }: Props = this.props;
    return (
      <Modal isActive={this.props.isActive}>
        <ModalBackground />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Transaction Details</ModalCardTitle>
            <Delete onClick={onCloseClick} />
          </ModalCardHeader>
          <ModalCardBody>
            <TransactionForm
              transaction={this.state.updatedTransaction}
              onInputChange={this.handleFormInputChange}
            />
          </ModalCardBody>
          <ModalCardFooter>
            <Button isColor="primary" onClick={this.handleSaveClick}>
              Save
            </Button>
            <Button onClick={onCloseClick}>Cancel</Button>
          </ModalCardFooter>
        </ModalCard>
      </Modal>
    );
  }
}

export default TransactionModal;
