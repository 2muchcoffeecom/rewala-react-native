import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { PagedResponseOf } from '../../../../../../../shared/models/pagedUser.model';
import { RequestError } from '../../../../../states';
import { PagedQuestionOfUserInput } from '../../../../../../../shared/services/question.service';
import { QuestionResponse } from '../../../../../../../shared/models/question.model';

export enum ActionTypes {
  PAGED_OF_USER_REQUEST_FIRST = 'PAGED_OF_USER_REQUEST_FIRST',
  PAGED_OF_USER_REQUEST_FIRST_SUCCESS = 'PAGED_OF_USER_REQUEST_FIRST_SUCCESS',
  PAGED_OF_USER_REQUEST_FIRST_FAIL = 'PAGED_OF_USER_REQUEST_FIRST_FAIL',
  PAGED_OF_USER_REQUEST_NEXT = 'PAGED_OF_USER_REQUEST_NEXT',
  PAGED_OF_USER_REQUEST_NEXT_SUCCESS = 'PAGED_OF_USER_REQUEST_NEXT_SUCCESS',
  PAGED_OF_USER_REQUEST_NEXT_FAIL = 'PAGED_OF_USER_REQUEST_NEXT_FAIL',
}

export const Actions = {
  pagedOfUserFirst: (data: PagedQuestionOfUserInput) => {
    return createAction(ActionTypes.PAGED_OF_USER_REQUEST_FIRST, {data});
  },
  pagedOfUserFirstSuccess: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.PAGED_OF_USER_REQUEST_FIRST_SUCCESS, {data});
  },
  pagedOfUserFirstFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.PAGED_OF_USER_REQUEST_FIRST_FAIL, {errors});
  },
  pagedOfUserNext: (data: PagedQuestionOfUserInput) => {
    return createAction(ActionTypes.PAGED_OF_USER_REQUEST_NEXT, {data});
  },
  pagedOfUserNextSuccess: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.PAGED_OF_USER_REQUEST_NEXT_SUCCESS, {data});
  },
  pagedOfUserNextFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.PAGED_OF_USER_REQUEST_NEXT_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
