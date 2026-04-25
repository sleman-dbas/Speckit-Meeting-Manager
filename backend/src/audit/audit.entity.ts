import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuditEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  actorId!: string;

  @Column()
  action!: string;

  @Column()
  entityType!: string;

  @Column({ nullable: true })
  entityId?: string;

  @Column('json', { nullable: true })
  details?: Record<string, unknown>;

  @CreateDateColumn()
  createdAt!: Date;
}
