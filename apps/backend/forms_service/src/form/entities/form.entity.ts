import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';

@Entity({ name: 'form' })
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.forms)
  user: User;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  backgroundColor: string;

  @Column({ type: 'text', nullable: true })
  questionColor: string;

  @Column({ type: 'text', nullable: true })
  answerColor: string;

  @OneToMany(() => Question, (question) => question.form)
  questions: Question[];

  @Column('jsonb')
  payment: any;
}
