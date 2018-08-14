// @flow
export type TransactionType = 'Withdrawal' | 'Deposit';

export type Transaction = {
  id: number,
  transactionDate: string,
  toFrom: string,
  type: TransactionType,
  categoryId: number,
  amount: number,
  description: string,
};
