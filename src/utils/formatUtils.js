// @flow
import { timeParse, timeFormat } from 'd3-time-format';
import { formatMoney as accountingFormat } from 'accounting';

export const formatDate = (dateValue: string): string => {
  const parsedDate = timeParse('%Y-%m-%d')(dateValue);
  return timeFormat('%m/%d/%Y')(parsedDate);
};

export const formatMoney = (amount: number = 0): string => {
  if (amount === 0) return accountingFormat(amount);
  return accountingFormat(amount, {
    format: { pos: '%s %v', neg: '%s (%v)' },
  });
};
