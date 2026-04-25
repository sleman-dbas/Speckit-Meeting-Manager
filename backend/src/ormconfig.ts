import { DataSourceOptions } from 'typeorm';
import { Meeting } from './meetings/entities/meeting.entity';
import { AuditEntry } from './audit/audit.entity';

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT ?? 5432),
  username: process.env.DATABASE_USER ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'password',
  database: process.env.DATABASE_NAME ?? 'meeting_management',
  entities: [Meeting, AuditEntry],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  migrationsRun: false,
};

export default ormconfig;
