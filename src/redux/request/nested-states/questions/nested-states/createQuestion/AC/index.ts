import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { QuestionResponse } from '../../../../../../../shared/models/question.model';
import { CreateQuestionInput } from '../../../../../../../shared/services/question.service';
import { Reject, RequestError, Resolve } from '../../../../../states';

export enum ActionTypes {
  CREATE_QUESTION = 'CREATE_QUESTION',
  CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS',
  CREATE_QUESTION_FAIL = 'CREATE_QUESTION_FAIL',
}

export const Actions = {
  createQuestion: (
    data: CreateQuestionInput, resolve?: Resolve<QuestionResponse>, reject?: Reject,
  ) => createAction(ActionTypes.CREATE_QUESTION, {data, resolve, reject}),
  createQuestionSuccess: (data: QuestionResponse) => {
    return createAction(ActionTypes.CREATE_QUESTION_SUCCESS, {data});
  },
  createQuestionFail: (errors: RequestError) => {
    return createAction(ActionTypes.CREATE_QUESTION_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
