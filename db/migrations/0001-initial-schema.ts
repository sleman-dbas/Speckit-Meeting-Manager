import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema0001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "meeting" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "title" varchar NOT NULL,
      "description" text,
      "date" date NOT NULL,
      "startTime" time NOT NULL,
      "durationMinutes" integer NOT NULL,
      "location" varchar NOT NULL,
      "confidentialityLevel" varchar(20) NOT NULL,
      "status" varchar(20) NOT NULL,
      "organizerId" uuid NOT NULL,
      "minutes" text,
      "outcomes" text,
      "proposals" text,
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      "updatedAt" timestamptz NOT NULL DEFAULT now()
    );`);

    await queryRunner.query(`CREATE TABLE "participant" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "meetingId" uuid NOT NULL,
      "userId" uuid NOT NULL,
      "role" varchar(20) NOT NULL,
      "responseStatus" varchar(20) NOT NULL DEFAULT 'Pending',
      "phoneNumber" varchar NOT NULL,
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      "updatedAt" timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT "FK_participant_meeting" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE
    );`);

    await queryRunner.query(`CREATE TABLE "audit_entry" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "actorId" uuid NOT NULL,
      "action" varchar NOT NULL,
      "entityType" varchar NOT NULL,
      "entityId" uuid,
      "details" json,
      "createdAt" timestamptz NOT NULL DEFAULT now()
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "audit_entry";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "meeting";`);
  }
}
