import { Controller, Post, Body } from '@nestjs/common';
import { JobsService } from './jobs.servise';
import { JobDto } from './dto/job.dto';

@Controller('api')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post('jobs')
  jobs(@Body() jobDto: JobDto): Promise<void> {
    return this.jobsService.createJob(jobDto);
  }
}
