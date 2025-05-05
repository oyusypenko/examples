import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResponse } from './dto/exchange-rate.dto';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) { }

    @Query(() => ExchangeRateResponse)
    async exchangeRates(): Promise<ExchangeRateResponse> {
        return this.exchangeRateService.getExchangeRates();
    }
}
