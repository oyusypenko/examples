import { IsString } from 'class-validator';

export class JobDto {
  @IsString()
  user_id: string;

  @IsString()
  prompt: string;
}