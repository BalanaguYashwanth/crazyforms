import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
  create(createQuestionDto: CreateQuestionDto) {
    const formId = createQuestionDto.formId;
    const questions = createQuestionDto.questions;

    const updatedQuestions = questions.map(({ id, ...question }: any) => ({
      ...question,
      questionId: id,
      form: formId,
    }));
    return this.questionRepository.save(updatedQuestions);
  }

  findAll() {
    return `This action returns all question`;
  }

  async findOne(id: any) {
    const forms = await this.questionRepository.find({ where: { form: id } });
    const restructuredForm = forms.map((form, index) => ({
      ...form,
      id: `${index}${form.questionId}`,
    }));
    return restructuredForm;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} ${updateQuestionDto} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
