import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { PagedResponseOf } from '../../../../../../../shared/models/pagedUser.model';
import { RequestError } from '../../../../../states';
import { PagedQuestionInput } from '../../../../../../../shared/services/question.service';
import { QuestionResponse } from '../../../../../../../shared/models/question.model';

export enum ActionTypes {
  PAGED_FEED_REQUEST_FIRST = 'PAGED_FEED_REQUEST_FIRST',
  PAGED_FEED_REQUEST_FIRST_SUCCESS = 'PAGED_FEED_REQUEST_FIRST_SUCCESS',
  PAGED_FEED_REQUEST_FIRST_FAIL = 'PAGED_FEED_REQUEST_FIRST_FAIL',
  PAGED_FEED_REQUEST_NEXT = 'PAGED_FEED_REQUEST_NEXT',
  PAGED_FEED_REQUEST_NEXT_SUCCESS = 'PAGED_FEED_REQUEST_NEXT_SUCCESS',
  PAGED_FEED_REQUEST_NEXT_FAIL = 'PAGED_FEED_REQUEST_NEXT_FAIL',
}

export const Actions = {
  pagedFeedFirst: (data: PagedQuestionInput) => createAction(ActionTypes.PAGED_FEED_REQUEST_FIRST, {data}),
  pagedFeedFirstSuccess: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.PAGED_FEED_REQUEST_FIRST_SUCCESS, {data});
  },
  pagedFeedFirstFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.PAGED_FEED_REQUEST_FIRST_FAIL, {errors});
  },
  pagedFeedNext: (data: PagedQuestionInput) => createAction(ActionTypes.PAGED_FEED_REQUEST_NEXT, {data}),
  pagedFeedNextSuccess: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.PAGED_FEED_REQUEST_NEXT_SUCCESS, {data});
  },
  pagedFeedNextFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.PAGED_FEED_REQUEST_NEXT_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
