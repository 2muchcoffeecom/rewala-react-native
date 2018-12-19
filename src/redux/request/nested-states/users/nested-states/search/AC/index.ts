import { createAction, ActionsUnion } from '../../../../../../../shared/helpers/createAction';
import { PagedUserModel } from '../../../../../../../shared/models/pagedUser.model';
import { SearchUserInput } from '../../../../../../../shared/services/user.service';
import { RequestError } from '../../../../../states';

export enum ActionTypes {
  SEARCH = 'SEARCH',
  SEARCH_SUCCESS = 'SEARCH_SUCCESS',
  SEARCH_FAIL = 'SEARCH_FAIL',
}

export const Actions = {
  search: (data: SearchUserInput) => createAction(ActionTypes.SEARCH, {data}),
  searchSuccess: (data: PagedUserModel) => {
    return createAction(ActionTypes.SEARCH_SUCCESS, {data});
  },
  searchFail: (errors: RequestError | string) => {
    return createAction(ActionTypes.SEARCH_FAIL, {errors});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
