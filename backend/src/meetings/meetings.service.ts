import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditService } from '../audit/audit.service';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingsRepository: Repository<Meeting>,
    private readonly auditService: AuditService,
  ) {}

  async createMeeting(organizerId: string, payload: CreateMeetingDto): Promise<Meeting> {
    const meeting = this.meetingsRepository.create({
      ...payload,
      organizerId,
    });
    const saved = await this.meetingsRepository.save(meeting);
    await this.auditService.logAction(organizerId, 'CreateMeeting', 'Meeting', saved.id, { title: saved.title });
    return saved;
  }

  async updateMeeting(id: string, payload: UpdateMeetingDto, userId: string): Promise<Meeting> {
    const meeting = await this.meetingsRepository.findOne({ where: { id } });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }
    Object.assign(meeting, payload);
    const updated = await this.meetingsRepository.save(meeting);
    await this.auditService.logAction(userId, 'UpdateMeeting', 'Meeting', updated.id, { changes: payload });
    return updated;
  }

  async getMeetings(): Promise<Meeting[]> {
    return this.meetingsRepository.find({
      relations: { participants: true },
      order: { date: 'ASC', startTime: 'ASC' },
    });
  }

  async getMeetingById(id: string): Promise<Meeting> {
    const meeting = await this.meetingsRepository.findOne({
      where: { id },
      relations: { participants: true },
    });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }
    return meeting;
  }
}
