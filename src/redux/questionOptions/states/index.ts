import { QuestionOptionModel } from '../../../shared/models/questionOption.model';

export interface QuestionOptionsState {
  entities: QuestionOptionModel[];
}

export const initialState: QuestionOptionsState = {
  entities: [],
};