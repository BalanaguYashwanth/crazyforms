import { Form } from 'src/form/entities/form.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'question' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  questionId: string;

  @ManyToOne(() => Form, (form) => form.questions, { nullable: false })
  form: Form;

  @Column()
  name: string;

  @Column('jsonb')
  attributes: any;
}
