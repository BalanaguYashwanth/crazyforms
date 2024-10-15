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
import { CreateQuestionDto } from './dto/create-question.dto';
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
  createAnswers(@Body() data: any) {
    return this.questionService.createAnswers(data);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('form/:formId')
  findAnswerByFormId(@Param('formId') formId: number) {
    return this.questionService.findAnswerByFormId(formId);
  }

  @Get('form/:formId/user/:userId')
  findByFormIdUserId(
    @Param('formId') formId: number,
    @Param('userId') userId: number,
  ) {
    return this.questionService.findAnswerByFormIdUserId(formId, userId);
  }

  @Get(':id')
  findByForm(@Param('id') id: string) {
    return this.questionService.findByForm(id);
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
