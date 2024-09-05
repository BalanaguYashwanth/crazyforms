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

  @ManyToOne(() => User, (user) => user.forms, { nullable: false })
  user: User;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: 'text', unique: true })
  title: string;

  @Column({ type: 'text', nullable: true, default: null })
  backgroundColor: string;

  @Column({ type: 'text', nullable: true, default: null })
  questionColor: string;

  @Column({ type: 'text', nullable: true, default: null })
  answerColor: string;

  @OneToMany(() => Question, (question) => question.form)
  questions: Question[];

  @Column('jsonb')
  payment: any;
}
