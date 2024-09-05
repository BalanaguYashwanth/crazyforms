import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from './form.entity';

@Entity({ name: 'question' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Form, (form) => form.questions)
  form: Form;

  @Column()
  name: string;

  @Column('jsonb')
  attributes: any;
}
