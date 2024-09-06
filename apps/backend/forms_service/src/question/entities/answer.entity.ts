import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';
import { User } from 'src/user/entities/user.entity';
import { Form } from 'src/form/entities/form.entity';

@Entity({ name: 'answer' })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Form, (form) => form.answers, { nullable: false })
  form: Form;

  @ManyToOne(() => Question, (question) => question.answers, {
    nullable: false,
  })
  question: Question;

  @ManyToOne(() => User, (user) => user.answers, { nullable: false })
  user: User;

  @Column()
  answer: string;
}
