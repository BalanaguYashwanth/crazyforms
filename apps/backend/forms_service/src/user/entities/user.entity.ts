import { Max, Min } from 'class-validator';
import { Form } from 'src/form/entities/form.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//todo - google auth info
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Min(12)
  @Max(90)
  age: number;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: ['M', 'F'],
  })
  gender: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Form, (form) => form.user)
  forms: Form[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
