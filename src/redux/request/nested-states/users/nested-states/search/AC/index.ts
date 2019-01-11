import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { PagedResponseOf } from '../../../../../../../shared/models/pagedUser.model';
import { SearchUserInput } from '../../../../../../../shared/services/user.service';
import { RequestError } from '../../../../../states';
import { UserResponse } from '../../../../../../../shared/models/user.model';

export enum ActionTypes {
  NEW_SEARCH = 'NEW_SEARCH',
  NEW_SEARCH_SUCCESS = 'NEW_SEARCH_SUCCESS',
  NEW_SEARCH_FAIL = 'NEW_SEARCH_FAIL',
  NEW_SEARCH_PAGE = 'NEW_SEARCH_PAGE',
  NEW_SEARCH_PAGE_SUCCESS = 'NEW_SEARCH_PAGE_SUCCESS',
  NEW_SEARCH_PAGE_FAIL = 'NEW_SEARCH_PAGE_FAIL',
}

export const Actions = {
  newSearch: (data: SearchUserInput) => createAction(ActionTypes.NEW_SEARCH, {data}),
  newSearchSuccess: (data: PagedResponseOf<UserResponse>) => {
    return createAction(ActionTypes.NEW_SEARCH_SUCCESS, {data});
  },
  newSearchFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.NEW_SEARCH_FAIL, {errors});
  },
  newSearchPage: (data: SearchUserInput) => createAction(ActionTypes.NEW_SEARCH_PAGE, {data}),
  newSearchPageSuccess: (data: PagedResponseOf<UserResponse>) => {
    return createAction(ActionTypes.NEW_SEARCH_PAGE_SUCCESS, {data});
  },
  newSearchPageFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.NEW_SEARCH_PAGE_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
