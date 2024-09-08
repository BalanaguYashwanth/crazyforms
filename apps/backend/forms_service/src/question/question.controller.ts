import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateAnswerDto, CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  //createOrUpdateQuestions
  @Post()
  upsert(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.upsert(createQuestionDto);
  }

  @Post('answers')
  createAnswers(@Body() createAnswerDto: CreateAnswerDto[]) {
    return this.questionService.createAnswers(createAnswerDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findByForm(@Param('id') id: string) {
    return this.questionService.findByForm(+id);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.updateOne(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
