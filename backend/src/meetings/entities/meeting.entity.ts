import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Participant } from '../../participants/entities/participant.entity';

export type MeetingStatus = 'Pending' | 'Confirmed' | 'Postponed' | 'Canceled' | 'Completed';
export type ConfidentialityLevel = 'Public' | 'Internal' | 'Restricted';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'int' })
  durationMinutes!: number;

  @Column()
  location!: string;

  @Column({ type: 'varchar', length: 20 })
  confidentialityLevel!: ConfidentialityLevel;

  @Column({ type: 'varchar', length: 20 })
  status!: MeetingStatus;

  @Column()
  organizerId!: string;

  @Column({ type: 'text', nullable: true })
  minutes?: string;

  @Column({ type: 'text', nullable: true })
  outcomes?: string;

  @Column({ type: 'text', nullable: true })
  proposals?: string;

  @OneToMany(() => Participant, (participant) => participant.meeting, {
    cascade: true,
  })
  participants?: Participant[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
