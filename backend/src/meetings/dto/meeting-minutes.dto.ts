import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TaskItem {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  assigneeId!: string;

  @IsString()
  dueDate!: string;
}

export class MeetingMinutesDto {
  @IsString()
  @IsOptional()
  minutes?: string;

  @IsString()
  @IsOptional()
  outcomes?: string;

  @IsString()
  @IsOptional()
  proposals?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskItem)
  @IsOptional()
  tasks?: TaskItem[];
}
