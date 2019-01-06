import { initialState as createQuestionState } from '../nested-states/createQuestion/states';

import { QuestionModel } from '../../../../../shared/models/question.model';
import { RequestError } from '../../../states';

export interface RequestNestedState {
  loading: boolean;
  loaded: boolean;
  errors: RequestError | string | null;
  data: null | QuestionModel;
}

export interface QuestionsRequestState {
  createQuestion: RequestNestedState;
}

export const initialState: QuestionsRequestState = {
  createQuestion: createQuestionState,
};