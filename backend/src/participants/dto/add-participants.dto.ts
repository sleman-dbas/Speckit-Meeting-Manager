import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export type ParticipantRole = 'Attendee' | 'Presenter' | 'Observer';

class ParticipantItem {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsEnum(['Attendee', 'Presenter', 'Observer'])
  role!: ParticipantRole;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9][0-9]{7,14}$/)
  phoneNumber!: string;
}

export class AddParticipantsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ParticipantItem)
  participants!: ParticipantItem[];
}
