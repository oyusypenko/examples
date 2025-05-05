import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CNBApiServiceClient } from './cnb-api.service';
import { CNBRatesApi } from './rates/cnb-api.rates.api';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('CNB_API_URL'),
        timeout: 5000,
      }),
    }),
  ],
  providers: [CNBApiServiceClient, CNBRatesApi],
  exports: [CNBApiServiceClient, CNBRatesApi],
})
export class CNBApiModule { }