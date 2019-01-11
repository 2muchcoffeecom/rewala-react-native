import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { PagedResponseOf } from '../../../../../../../shared/models/pagedUser.model';
import { RequestError } from '../../../../../states';
import { PagedQuestionInput } from '../../../../../../../shared/services/question.service';
import { QuestionResponse } from '../../../../../../../shared/models/question.model';

export enum ActionTypes {
  PAGED_ME_REQUEST_FIRST = 'PAGED_ME_REQUEST_FIRST',
  PAGED_ME_REQUEST_FIRST_SUCCESS = 'PAGED_ME_REQUEST_FIRST_SUCCESS',
  PAGED_ME_REQUEST_FIRST_FAIL = 'PAGED_ME_REQUEST_FIRST_FAIL',
  PAGED_ME_REQUEST_NEXT = 'PAGED_ME_REQUEST_NEXT',
  PAGED_ME_REQUEST_NEXT_SUCCESS = 'PAGED_ME_REQUEST_NEXT_SUCCESS',
  PAGED_ME_REQUEST_NEXT_FAIL = 'PAGED_ME_REQUEST_NEXT_FAIL',
}

export const Actions = {
  pagedMeFirst: (data: PagedQuestionInput) => createAction(ActionTypes.PAGED_ME_REQUEST_FIRST, {data}),
  pagedMeFirstSuccess: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.PAGED_ME_REQUEST_FIRST_SUCCESS, {data});
  },
  pagedMeFirstFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.PAGED_ME_REQUEST_FIRST_FAIL, {errors});
  },
  pagedMeNext: (data: PagedQuestionInput) => createAction(ActionTypes.PAGED_ME_REQUEST_NEXT, {data}),
  pagedMeNextSuccess: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.PAGED_ME_REQUEST_NEXT_SUCCESS, {data});
  },
  pagedMeNextFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.PAGED_ME_REQUEST_NEXT_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
