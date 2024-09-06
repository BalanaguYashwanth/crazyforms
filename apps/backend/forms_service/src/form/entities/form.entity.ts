import { Answer } from 'src/question/entities/answer.entity';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'form' })
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.forms, { nullable: false })
  user: User;

  @OneToMany(() => Question, (question) => question.form)
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.form)
  answers: Answer[];

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

  @Column('jsonb')
  payment: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
