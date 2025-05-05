export interface ExchangeRate {
  validFor: string;
  order: number;
  country: string;
  currency: string;
  amount: number;
  currencyCode: string;
  rate: number;
}

export interface ExchangeRatesResponse {
  rates: Array<ExchangeRate>;
  lastUpdated: string;
}
