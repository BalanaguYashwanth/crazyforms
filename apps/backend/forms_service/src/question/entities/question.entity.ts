import { Form } from 'src/form/entities/form.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';

@Entity({ name: 'question' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToOne(() => Form, (form) => form.questions, { nullable: false })
  form: Form;

  @Column({ type: 'text', nullable: false })
  questionId: string;

  @Column()
  name: string;

  @Column('jsonb')
  attributes: any;
}
