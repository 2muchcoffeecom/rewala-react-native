import { QuestionResponse } from './question.model';

export class QuestionOptionModel {
  _id: string = '';
  text: string = '';
  questionId: string = '';
  votes: number = 0;

  constructor(obj: QuestionResponse) {
    for (const field in obj.questionOptions) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj[field];
      }
    }
  }
}