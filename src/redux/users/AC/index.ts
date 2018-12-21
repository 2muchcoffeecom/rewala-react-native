import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { UserResponse } from '../../../shared/models/user.model';
import { PagedUserModel } from '../../../shared/models/pagedUser.model';
import { UpdateUserInput, SearchUserInput } from '../../../shared/services/user.service';
import { Reject, Resolve } from '../../request/states';

export enum ActionTypes {
  SET_USERS_DATA = 'SET_USERS_DATA',
  SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH = 'SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH',
  SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH_PAGE = 'SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH_PAGE',
  DELETE_PAGED_USERS_IDS = 'DELETE_PAGED_USERS_IDS',
  SET_PAGED_USERS_OPTIONS = 'SET_PAGED_USERS_OPTIONS',
  GET_AUTHORIZED_USER = 'GET_AUTHORIZED_USER',
  UPDATE_AUTHORIZED_USER = 'UPDATE_AUTHORIZED_USER',
  SEARCH_USERS = 'SEARCH_USERS',
}

export const Actions = {
  setUsersData: (data: UserResponse[]) => {
    return createAction(ActionTypes.SET_USERS_DATA, {data});
  },
  setPagedUsersIdsAfterNewSearch: (data: PagedUserModel) => {
    return createAction(ActionTypes.SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH, {data});
  },
  setPagedUsersIdsAfterNewSearchPage: (data: PagedUserModel) => {
    return createAction(ActionTypes.SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH_PAGE, {data});
  },
  deletePagedUsersIds: () => {
    return createAction(ActionTypes.DELETE_PAGED_USERS_IDS);
  },
  setPagedUsersOptions: (data: PagedUserModel) => {
    return createAction(ActionTypes.SET_PAGED_USERS_OPTIONS, {data});
  },
  getAuthorizedUser: () => {
    return createAction(ActionTypes.GET_AUTHORIZED_USER);
  },
  updateAuthorizedUser: (data: UpdateUserInput, resolve?: Resolve<UserResponse>, reject?: Reject) => {
    return createAction(ActionTypes.UPDATE_AUTHORIZED_USER, {data, resolve, reject});
  },
  searchUsers: (data: SearchUserInput) => {
    return createAction(ActionTypes.SEARCH_USERS, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
