import { QuestionModel } from '../../../shared/models/question.model';

export interface QuestionsState {
  entities: QuestionModel[];
}

export const initialState: QuestionsState = {
  entities: [],
};