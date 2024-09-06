export interface Object {
  [key: string]: string;
}

export class CreateQuestionDto {
  formId: string;
  questions: Array<Object>;
}
