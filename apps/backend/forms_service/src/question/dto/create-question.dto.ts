export interface Object {
  [key: string]: string;
}

export class CreateQuestionDto {
  formId: string;
  questions: Array<Object>;
}

export class CreateAnswerDto {
  formId: number;
  questionId: number;
  userId: number;
  answer: string;
}
