import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { PagedResponseOf } from '../../../../../../../shared/models/pagedUser.model';
import { RequestError } from '../../../../../states';
import { PagedQuestionInput } from '../../../../../../../shared/services/question.service';
import { QuestionResponse } from '../../../../../../../shared/models/question.model';

export enum ActionTypes {
  PAGED_MY_REQUEST = 'PAGED_MY_REQUEST',
  PAGED_MY_REQUEST_SUCCESS = 'PAGED_MY_REQUEST_SUCCESS',
  PAGED_MY_REQUEST_FAIL = 'PAGED_MY_REQUEST_FAIL',
}

export const Actions = {
  pagedMy: (data: PagedQuestionInput) => createAction(ActionTypes.PAGED_MY_REQUEST, {data}),
  pagedMySuccess: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.PAGED_MY_REQUEST_SUCCESS, {data});
  },
  pagedMyFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.PAGED_MY_REQUEST_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
