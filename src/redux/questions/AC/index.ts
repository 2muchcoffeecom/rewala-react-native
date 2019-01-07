import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { QuestionResponse } from '../../../shared/models/question.model';
import { CreateQuestionInput } from '../../../shared/services/question.service';
import { Reject, Resolve } from '../../request/states';

export enum ActionTypes {
  SET_QUESTIONS_DATA = 'SET_QUESTIONS_DATA',
  SUBMIT_CREATE_QUESTION = 'SUBMIT_CREATE_QUESTION',
}

export const Actions = {
  setQuestionsData: (data: QuestionResponse[]) => {
    return createAction(ActionTypes.SET_QUESTIONS_DATA, {data});
  },
  submitCreateQuestion: (data: CreateQuestionInput, resolve?: Resolve<QuestionResponse>, reject?: Reject) => {
    return createAction(ActionTypes.SUBMIT_CREATE_QUESTION, {data, resolve, reject});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
