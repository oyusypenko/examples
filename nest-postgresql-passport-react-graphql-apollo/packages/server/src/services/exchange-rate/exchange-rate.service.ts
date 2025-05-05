import { Injectable, Logger } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CNBRatesApi } from 'src/api/cnb-api/rates/cnb-api.rates.api';
import { ExchangeRateEntity } from 'src/entities/exchange-rate.entity';
import { CurrencyRate, ExchangeRateResponse } from './dto/exchange-rate.dto';


@Injectable()
export class ExchangeRateService {
    private readonly logger = new Logger(ExchangeRateService.name);

    constructor(
        @InjectRepository(ExchangeRateEntity)
        private exchangeRateRepository: Repository<ExchangeRateEntity>,
        private readonly cnbRatesApi: CNBRatesApi,
        @InjectEntityManager()
        private entityManager: EntityManager
    ) { }

    public getExchangeRates = async (): Promise<ExchangeRateResponse> => {
        const cachedRates = await this.getCachedRates();
        if (cachedRates) {
            this.logger.log('Returning exchange rates from cache');
            return cachedRates;
        }

        this.logger.log('Fetching fresh exchange rates from CNB');
        const dailyRates = await this.fetchAndCacheRates();
        return dailyRates;
    };

    private async getCachedRates(): Promise<ExchangeRateResponse | null> {
        try {
            const latestRates = await this.exchangeRateRepository.find({
                order: { createdAt: 'DESC' },
                take: 1
            });

            const latestRateEntity = latestRates.length > 0 ? latestRates[0] : null;

            if (latestRateEntity) {
                const isCacheValid = latestRateEntity.isCacheValid();
                this.logger.log('isCacheValid', latestRateEntity.createdAt);
                if (isCacheValid) {
                    return {
                        rates: latestRateEntity.rates,
                        lastUpdated: latestRateEntity.createdAt,
                    };
                } else {
                    this.logger.log('Cache found but expired, will fetch fresh data');
                }
            } else {
                this.logger.log('No cache found in database');
            }
        } catch (error) {
            this.logger.error('Error getting cached rates', error);
        }

        return null;
    }

    private async fetchAndCacheRates(): Promise<ExchangeRateResponse> {
        let rates: CurrencyRate[] = [];
        let createdAt: Date = new Date();

        try {
            const response = await this.cnbRatesApi.getDailyExchangeRates();
            rates = response.rates;

            if (!rates || rates.length === 0) {
                throw new Error('Received empty rates from API');
            }

            this.logger.log(`Successfully fetched ${rates.length} exchange rates from API`);
        } catch (error) {
            this.logger.error('Error fetching exchange rates from API', error);

            const fallbackRates = await this.getFallbackRates();
            if (fallbackRates) {
                this.logger.log('Using outdated cache as fallback');
                return fallbackRates;
            }

            return {
                rates: [],
                lastUpdated: createdAt,
            };
        }

        try {

            await this.entityManager.transaction(async transactionalManager => {
                await transactionalManager.clear(ExchangeRateEntity);
                this.logger.log('Removed previous exchange rate records (in transaction)');

                const rateEntity = transactionalManager.create(ExchangeRateEntity, {
                    rates: rates,
                    createdAt: createdAt
                });
                await transactionalManager.save(rateEntity);
                this.logger.log('Created new exchange rate record (in transaction)');
            });

            this.logger.log('Transaction completed successfully');

            return {
                rates: rates,
                lastUpdated: createdAt
            };
        } catch (error) {
            this.logger.error('Transaction failed while caching exchange rates', error);

            return {
                rates: rates,
                lastUpdated: createdAt,
            };
        }
    }

    private async getFallbackRates(): Promise<ExchangeRateResponse | null> {
        try {
            const outdatedRatesList = await this.exchangeRateRepository.find({
                order: { createdAt: 'DESC' },
                take: 1
            });

            const outdatedRates = outdatedRatesList.length > 0 ? outdatedRatesList[0] : null;

            if (outdatedRates) {
                this.logger.log(`Using outdated rates from ${outdatedRates.createdAt.toISOString()}`)
                return {
                    rates: outdatedRates.rates,
                    lastUpdated: outdatedRates.createdAt,
                };
            } else {
                this.logger.log('No fallback rates found in database');
            }
        } catch (error) {
            this.logger.error('Error getting fallback rates', error);
        }

        return null;
    }
}
