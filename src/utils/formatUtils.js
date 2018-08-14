// @flow
import { timeParse, timeFormat } from 'd3-time-format';
import { formatMoney as accountingFormat } from 'accounting';

/**
 * The date coming from the API is in this format:
 * "2017-08-03"
 * We're converting it to this format:
 * "08/02/2017"
 */
export const formatDate = (dateValue: string): string => {
  const parsedDate = timeParse('%Y-%m-%d')(dateValue);
  return timeFormat('%m/%d/%Y')(parsedDate);
};

/**
 * The amount from the API is just a number, we want to display
 * positive numbers with a dollar sign and decimal places and
 * negative numbers wrapped in parentheses.
 */
export const formatMoney = (amount: number = 0): string => {
  if (amount === 0) return accountingFormat(amount);
  return accountingFormat(amount, {
    format: { pos: '%s %v', neg: '%s (%v)' },
  });
};
