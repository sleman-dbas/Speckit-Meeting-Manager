import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get databaseHost(): string {
    return process.env.DATABASE_HOST ?? 'localhost';
  }

  get databasePort(): number {
    return Number(process.env.DATABASE_PORT ?? 5432);
  }

  get databaseUser(): string {
    return process.env.DATABASE_USER ?? 'postgres';
  }

  get databasePassword(): string {
    return process.env.DATABASE_PASSWORD ?? 'password';
  }

  get databaseName(): string {
    return process.env.DATABASE_NAME ?? 'meeting_management';
  }

  get jwtSecret(): string {
    return process.env.JWT_SECRET ?? 'change-this-secret';
  }
}
