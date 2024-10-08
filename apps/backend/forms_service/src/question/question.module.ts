import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { SUIContract } from './contracts/suiContract';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Answer]),
  ],
  controllers: [QuestionController],
  providers: [SUIContract, QuestionService],
})
export class QuestionModule {}
