export interface CNBExchangeRate {
  validFor: string;
  order: number;
  country: string;
  currency: string;
  amount: number;
  currencyCode: string;
  rate: number;
}

export interface CNBExchangeRateResponse {
  rates: Array<CNBExchangeRate>;
  lastUpdated: string;
}