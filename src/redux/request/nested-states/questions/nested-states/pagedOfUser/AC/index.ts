import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { PagedResponseOf } from '../../../../../../../shared/models/pagedUser.model';
import { RequestError } from '../../../../../states';
import { PagedQuestionOfUserInput } from '../../../../../../../shared/services/question.service';
import { QuestionResponse } from '../../../../../../../shared/models/question.model';

export enum ActionTypes {
  PAGED_OF_USER_REQUEST = 'PAGED_OF_USER_REQUEST',
  PAGED_OF_USER_REQUEST_SUCCESS = 'PAGED_OF_USER_REQUEST_SUCCESS',
  PAGED_OF_USER_REQUEST_FAIL = 'PAGED_OF_USER_REQUEST_FAIL',
}

export const Actions = {
  pagedOfUser: (data: PagedQuestionOfUserInput) => createAction(ActionTypes.PAGED_OF_USER_REQUEST, {data}),
  pagedOfUserSuccess: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.PAGED_OF_USER_REQUEST_SUCCESS, {data});
  },
  pagedOfUserFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.PAGED_OF_USER_REQUEST_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
