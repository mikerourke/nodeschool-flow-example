import * as React from 'react';
import { Control, Field, Input, Label, Select } from 'bloomer';
import type { Transaction } from '../types';

type Props = {
  transaction: $Shape<Transaction>,
  onInputChange: (event: SyntheticEvent<HTMLInputElement>) => void,
};

const TransactionForm = ({ transaction, onInputChange }: Props) => (
  <div>
    <Field>
      <Label>Date</Label>
      <Control>
        <Input
          type="date"
          name="transactionDate"
          value={transaction.transactionDate || ''}
          onChange={onInputChange}
        />
      </Control>
    </Field>
    <Field>
      <Label>To/From</Label>
      <Control>
        <Input
          type="text"
          name="toFrom"
          value={transaction.toFrom || ''}
          onChange={onInputChange}
        />
      </Control>
    </Field>
    <Field>
      <Label>Type</Label>
      <Control>
        <Select
          name="type"
          value={transaction.type || 'Deposit'}
          onChange={onInputChange}
        >
          <option>Deposit</option>
          <option>Withdrawal</option>
        </Select>
      </Control>
    </Field>
    <Field>
      <Label>Amount</Label>
      <Control>
        <Input
          type="number"
          name="amount"
          value={transaction.amount || 0}
          onChange={onInputChange}
        />
      </Control>
    </Field>
    <Field>
      <Label>Description</Label>
      <Control>
        <Input
          type="text"
          name="description"
          value={transaction.description || ''}
          onChange={onInputChange}
        />
      </Control>
    </Field>
  </div>
);

export default TransactionForm;
