import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['Open', 'InProgress', 'Completed'])
  @IsOptional()
  status?: 'Open' | 'InProgress' | 'Completed';
}
