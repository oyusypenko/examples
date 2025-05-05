import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.servise';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule { }
