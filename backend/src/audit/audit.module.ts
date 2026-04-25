import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './audit.service';
import { AuditEntry } from './audit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditEntry])],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
