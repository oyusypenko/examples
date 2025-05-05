import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { z } from 'zod';
import { JobDto } from './dto/job.dto';

const jobSchema = z.object({
  user_id: z.string(),
  prompt: z.string(),
});

@Injectable()
export class JobsService {
  constructor(@InjectQueue('jobs') private readonly jobsQueue: Queue) { }

  async createJob(jobDto: JobDto): Promise<void> {
    const parsedJob = jobSchema.parse(jobDto);
    await this.jobsQueue.add(parsedJob);
  }
}
