import { CNBExchangeRate } from 'src/api/cnb-api/rates/cnb-api.rates.interfaces';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exchange_rates')
export class ExchangeRateEntity {
  private static readonly CACHE_TTL_MS = 5 * 60 * 1000;

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('jsonb')
  rates!: CNBExchangeRate[];

  @CreateDateColumn()
  createdAt!: Date;

  isCacheValid(): boolean {
    const now = new Date();
    const createdDate = new Date(this.createdAt);
    const expiryTimeMs = createdDate.getTime() + ExchangeRateEntity.CACHE_TTL_MS;
    return expiryTimeMs > now.getTime();
  }
}