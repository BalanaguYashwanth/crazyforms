import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto, CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { triggerRewards } from './helpers/rewards';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
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

  async findAnswerByFormIdUserId(formId: any, userId: any) {
    const data = await this.answerRepository
      .createQueryBuilder('question')
      .innerJoinAndSelect('question.form', 'form')
      .innerJoinAndSelect('question.user', 'user')
      .where('form.id = :formId', { formId: Number(formId) })
      .andWhere('user.id = :userId', { userId: Number(userId) })
      .getMany();
    return { isExists: data.length > 0 ? true : false };
  }

  async findByForm(id: string) {
    const forms = await this.questionRepository
      .createQueryBuilder('question')
      .innerJoinAndSelect('question.form', 'form')
      .where('form.id = :id', { id: Number(id) })
      .getMany();

    const restructuredForm = forms.map((form, index) => ({
      ...form,
      key: form.id,
      id: `${index}${form.questionId}`,
    }));
    return restructuredForm;
  }

  async createAnswers({
    answers,
    chainType,
    escrowId,
    receiverAddress,
  }: {
    answers: CreateAnswerDto[];
    chainType: string;
    escrowId: string;
    receiverAddress: string;
  }) {
    try {
      if (escrowId && receiverAddress && chainType) {
        await triggerRewards({ escrowId, receiverAddress, chainType });
      }
      return this.answerRepository.save(answers);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          'Failed to create answers',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  updateOne(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} ${updateQuestionDto} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
