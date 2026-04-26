import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { Participant } from './entities/participant.entity';
import { Meeting } from '../meetings/entities/meeting.entity';
import { AuditModule } from '../audit/audit.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Participant, Meeting]), AuditModule, AuthModule],
  providers: [ParticipantsService],
  controllers: [ParticipantsController],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
