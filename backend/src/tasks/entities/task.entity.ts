import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type TaskStatus = 'Open' | 'InProgress' | 'Completed';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  meetingId!: string;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  assigneeId!: string;

  @Column({ type: 'varchar', length: 20, default: 'Open' })
  status!: TaskStatus;

  @Column({ type: 'date', nullable: true })
  dueDate?: string;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
