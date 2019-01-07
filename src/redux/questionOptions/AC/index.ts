import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { QuestionResponse } from '../../../shared/models/question.model';

export enum ActionTypes {
  SET_QUESTION_OPTIONS_DATA = 'SET_QUESTION_OPTIONS_DATA',
}

export const Actions = {
  setQuestionOptionsData: (data: QuestionResponse[]) => {
    return createAction(ActionTypes.SET_QUESTION_OPTIONS_DATA, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
