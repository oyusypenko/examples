import { gql, useQuery, QueryResult } from '@apollo/client';
import { ExchangeRatesResponse } from './types';

export const EXCHANGE_RATES_QUERY = gql`
  query GetExchangeRates {
    exchangeRates {
      rates {
        country
        currency
        amount
        currencyCode
        rate
      }
      lastUpdated
    }
  }
`;

export const useExchangeRates = (): QueryResult<{ exchangeRates: ExchangeRatesResponse }> => {
  return useQuery(EXCHANGE_RATES_QUERY);
};