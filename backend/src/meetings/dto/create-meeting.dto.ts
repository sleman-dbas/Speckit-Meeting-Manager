import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { MeetingStatus, ConfidentialityLevel } from '../entities/meeting.entity';

export class CreateMeetingDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  date!: string;

  @IsString()
  startTime!: string;

  @IsInt()
  @Min(1)
  durationMinutes!: number;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsEnum(['Public', 'Internal', 'Restricted'])
  confidentialityLevel!: ConfidentialityLevel;

  @IsEnum(['Pending', 'Confirmed', 'Postponed', 'Canceled', 'Completed'])
  status!: MeetingStatus;
}
