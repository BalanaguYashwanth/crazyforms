import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
  upsert(createQuestionDto: CreateQuestionDto) {
    const { formId, questions } = createQuestionDto;
    const updatedQuestions = questions.map(({ id, key, ...question }) => ({
      ...question,
      questionId: id,
      id: key,
      form: formId,
    }));
    return this.questionRepository.save(updatedQuestions as unknown);
  }

  findAll() {
    return `This action returns all question`;
  }

  async findByForm(id: any) {
    const forms = await this.questionRepository.find({ where: { form: id } });
    const restructuredForm = forms.map((form, index) => ({
      ...form,
      key: form.id,
      id: `${index}${form.questionId}`,
    }));
    return restructuredForm;
  }

  updateOne(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} ${updateQuestionDto} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
