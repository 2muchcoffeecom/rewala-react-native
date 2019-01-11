import { initialState as createQuestionState } from '../nested-states/createQuestion/states';
import { initialState as pagedFeedState } from '../nested-states/pagedFeed/states';
import { initialState as pagedMeState } from '../nested-states/pagedMe/states';
import { initialState as pagedOfUserState } from '../nested-states/pagedOfUser/states';

import { QuestionModel } from '../../../../../shared/models/question.model';
import { PagedOptions, RequestError } from '../../../states';

export interface RequestNestedState {
  loading: boolean;
  isLoadingFirstPage?: boolean;
  isLoadingNextPage?: boolean;
  loaded: boolean;
  isLoadedFirstPage?: boolean;
  isLoadedNextPage?: boolean;
  pagedOptions?: PagedOptions;
  errors: RequestError | string | null;
  data: null | QuestionModel | QuestionModel[];
}

export interface QuestionsRequestState {
  createQuestion: RequestNestedState;
  pagedFeed: RequestNestedState;
  pagedMe: RequestNestedState;
  pagedOfUser: RequestNestedState;
}

export const initialState: QuestionsRequestState = {
  createQuestion: createQuestionState,
  pagedFeed: pagedFeedState,
  pagedMe: pagedMeState,
  pagedOfUser: pagedOfUserState,
};