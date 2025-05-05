import { Field, ObjectType, Float, Int } from '@nestjs/graphql';
import { CNBExchangeRate } from 'src/api/cnb-api/rates/cnb-api.rates.interfaces';

@ObjectType()
export class CurrencyRate implements CNBExchangeRate {
  @Field()
  validFor!: string;

  @Field(() => Int)
  order!: number;

  @Field()
  country!: string;

  @Field()
  currency!: string;

  @Field(() => Float)
  amount!: number;

  @Field()
  currencyCode!: string;

  @Field(() => Float)
  rate!: number;
}

@ObjectType()
export class ExchangeRateResponse {
  @Field(() => [CurrencyRate])
  rates!: CurrencyRate[];

  @Field()
  lastUpdated!: Date;
}