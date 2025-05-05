import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { CNBApiModule } from 'src/api/cnb-api/cnb-api.module';
import { ExchangeRateEntity } from 'src/entities/exchange-rate.entity';

@Module({
    imports: [
        CNBApiModule,
        TypeOrmModule.forFeature([ExchangeRateEntity])
    ],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule { }
