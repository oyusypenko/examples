import React from 'react';
import { ExchangeRate } from '../../api/graphql/types';

interface ExchangeRatesTableProps {
  rates: ExchangeRate[];
}

export const ExchangeRatesTable: React.FC<ExchangeRatesTableProps> = ({ rates }) => {
  return (
    <div className="exchange-rates-table">
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>Code</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.country}</td>
              <td>{rate.currency}</td>
              <td>{rate.amount}</td>
              <td>{rate.currencyCode}</td>
              <td>{rate.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRatesTable;