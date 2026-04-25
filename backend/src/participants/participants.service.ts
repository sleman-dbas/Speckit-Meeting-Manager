import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditService } from '../audit/audit.service';
import { Meeting } from '../meetings/entities/meeting.entity';
import { Participant } from './entities/participant.entity';
import { AddParticipantsDto } from './dto/add-participants.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
    @InjectRepository(Meeting)
    private readonly meetingsRepository: Repository<Meeting>,
    private readonly auditService: AuditService,
  ) {}

  async addParticipants(meetingId: string, payload: AddParticipantsDto, actorId: string) {
    const meeting = await this.meetingsRepository.findOne({ where: { id: meetingId } });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    const participants = payload.participants.map((participant) =>
      this.participantsRepository.create({
        meeting,
        meetingId,
        userId: participant.userId,
        role: participant.role,
        phoneNumber: participant.phoneNumber,
      }),
    );

    const savedParticipants = await this.participantsRepository.save(participants);
    await this.auditService.logAction(actorId, 'AddParticipants', 'Participant', meetingId, {
      participants: savedParticipants.map((item) => ({ userId: item.userId, role: item.role })),
    });

    return savedParticipants;
  }

  async getParticipantsForMeeting(meetingId: string) {
    return this.participantsRepository.find({
      where: { meetingId },
      order: { createdAt: 'ASC' },
    });
  }
}
