import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Meeting } from '../../meetings/entities/meeting.entity';

export type ParticipantRole = 'Attendee' | 'Presenter' | 'Observer';
export type ParticipantResponseStatus = 'Pending' | 'Accepted' | 'Declined';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  meetingId!: string;

  @ManyToOne(() => Meeting, (meeting) => meeting.participants, { onDelete: 'CASCADE' })
  meeting!: Meeting;

  @Column()
  userId!: string;

  @Column({ type: 'varchar', length: 20 })
  role!: ParticipantRole;

  @Column({ type: 'varchar', length: 20, default: 'Pending' })
  responseStatus!: ParticipantResponseStatus;

  @Column()
  phoneNumber!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
