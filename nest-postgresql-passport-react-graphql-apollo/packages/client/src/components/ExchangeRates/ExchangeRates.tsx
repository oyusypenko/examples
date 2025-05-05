import React from 'react';
import { useExchangeRates } from '../../api/graphql';
import ExchangeRatesTable from './ExchangeRatesTable';
import LastUpdatedInfo from './LastUpdatedInfo';

const ExchangeRates = () => {
  const { loading, error, data } = useExchangeRates();

  if (loading) return <p>Loading exchange rates...</p>;

  if (error) {
    return <p>Error loading exchange rates: {error.message}</p>;
  }

  if (!data || !data.exchangeRates || !data.exchangeRates.rates) {
    return <p>No exchange rate data available.</p>;
  }

  const { rates, lastUpdated } = data.exchangeRates;

  return (
    <div className="exchange-rates-container">
      <LastUpdatedInfo lastUpdated={lastUpdated} />
      <ExchangeRatesTable rates={rates} />
    </div>
  );
};

export default ExchangeRates;