import { Max, Min } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from './form.entity';

//todo - google auth credentials
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'number' })
  @Min(12)
  @Max(90)
  age: number;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Form, (form) => form.user)
  forms: Form[];
}
