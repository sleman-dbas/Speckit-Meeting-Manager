import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsModule } from './meetings/meetings.module';
import { ParticipantsModule } from './participants/participants.module';
import { TasksModule } from './tasks/tasks.module';
import { AuditModule } from './audit/audit.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './common/config/config.module';
import { Meeting } from './meetings/entities/meeting.entity';
import { AuditEntry } from './audit/audit.entity';
import { Participant } from './participants/entities/participant.entity';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: Number(process.env.DATABASE_PORT ?? 5432),
      username: process.env.DATABASE_USER ?? 'postgres',
      password: process.env.DATABASE_PASSWORD ?? 'password',
      database: process.env.DATABASE_NAME ?? 'meeting_management',
      entities: [Meeting, AuditEntry, Participant, Task],
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: false,
    }),
    MeetingsModule,
    ParticipantsModule,
    TasksModule,
    AuditModule,
    NotificationsModule,
    AuthModule,
  ],
})
export class AppModule {}
