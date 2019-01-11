import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { PagedResponseOf } from '../../../../../../../shared/models/pagedUser.model';
import { RequestError } from '../../../../../states';
import { PagedQuestionInput } from '../../../../../../../shared/services/question.service';
import { QuestionResponse } from '../../../../../../../shared/models/question.model';

export enum ActionTypes {
  PAGED_FEED_REQUEST = 'PAGED_FEED_REQUEST',
  PAGED_FEED_REQUEST_SUCCESS = 'PAGED_FEED_REQUEST_SUCCESS',
  PAGED_FEED_REQUEST_FAIL = 'PAGED_FEED_REQUEST_FAIL',
}

export const Actions = {
  pagedFeed: (data: PagedQuestionInput) => createAction(ActionTypes.PAGED_FEED_REQUEST, {data}),
  pagedFeedSuccess: (data: PagedResponseOf<QuestionResponse>) => {
    return createAction(ActionTypes.PAGED_FEED_REQUEST_SUCCESS, {data});
  },
  pagedFeedFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.PAGED_FEED_REQUEST_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
