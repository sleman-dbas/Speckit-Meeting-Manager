import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { MeetingStatus, ConfidentialityLevel } from '../entities/meeting.entity';

export class UpdateMeetingDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  startTime?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  durationMinutes?: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(['Public', 'Internal', 'Restricted'])
  @IsOptional()
  confidentialityLevel?: ConfidentialityLevel;

  @IsEnum(['Pending', 'Confirmed', 'Postponed', 'Canceled', 'Completed'])
  @IsOptional()
  status?: MeetingStatus;
}
