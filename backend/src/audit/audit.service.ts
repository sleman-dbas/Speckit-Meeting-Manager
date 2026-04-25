import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditEntry } from './audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntry)
    private readonly auditRepository: Repository<AuditEntry>,
  ) {}

  async logAction(actorId: string, action: string, entityType: string, entityId?: string, details?: Record<string, unknown>) {
    const entry = this.auditRepository.create({
      actorId,
      action,
      entityType,
      entityId,
      details,
    });
    return this.auditRepository.save(entry);
  }
}
