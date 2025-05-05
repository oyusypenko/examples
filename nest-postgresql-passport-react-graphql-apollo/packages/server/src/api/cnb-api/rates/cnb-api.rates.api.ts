import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CNBApiServiceClient } from '../cnb-api.service';
import { CNBApiEndpoints } from './cnb-api.rates.constants';
import { CNBExchangeRateResponse } from './cnb-api.rates.interfaces';

@Injectable()
export class CNBRatesApi {
  constructor(private cnbApiServiceClient: CNBApiServiceClient) { }

  async getDailyExchangeRates(): Promise<CNBExchangeRateResponse> {
    const response = await firstValueFrom(
      this.cnbApiServiceClient.get<CNBExchangeRateResponse>(CNBApiEndpoints.DAILY_EXCHANGE_RATES)
    );
    return response.data;
  }
}