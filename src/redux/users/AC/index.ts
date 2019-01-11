import { createAction, ActionsUnion } from '../../../shared/helpers/createAction';
import { UserResponse } from '../../../shared/models/user.model';
import { PagedResponseOf } from '../../../shared/models/pagedUser.model';
import { UpdateUserInput, SearchUserInput } from '../../../shared/services/user.service';
import { Reject, Resolve } from '../../request/states';

export enum ActionTypes {
  SET_USERS_DATA = 'SET_USERS_DATA',
  SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH = 'SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH',
  SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH_PAGE = 'SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH_PAGE',
  SET_FRIENDS_IDS_OF_USER = 'SET_FRIENDS_IDS_OF_USER',
  GET_AUTHORIZED_USER = 'GET_AUTHORIZED_USER',
  GET_FRIENDS_OF_USER = 'GET_FRIENDS_OF_USER',
  UPDATE_AUTHORIZED_USER = 'UPDATE_AUTHORIZED_USER',
  SEARCH_USERS = 'SEARCH_USERS',
}

export const Actions = {
  setUsersData: (data: UserResponse[]) => {
    return createAction(ActionTypes.SET_USERS_DATA, {data});
  },
  setPagedUsersIdsAfterNewSearch: (data: PagedResponseOf<UserResponse>) => {
    return createAction(ActionTypes.SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH, {data});
  },
  setPagedUsersIdsAfterNewSearchPage: (data: PagedResponseOf<UserResponse>) => {
    return createAction(ActionTypes.SET_PAGED_USERS_IDS_AFTER_NEW_SEARCH_PAGE, {data});
  },
  setFriendsIdsOfUser: (data: string[]) => {
    return createAction(ActionTypes.SET_FRIENDS_IDS_OF_USER, {data});
  },
  getAuthorizedUser: () => {
    return createAction(ActionTypes.GET_AUTHORIZED_USER);
  },
  getFrinedsOfUser: (data?: string) => {
    return createAction(ActionTypes.GET_FRIENDS_OF_USER, {data});
  },
  updateAuthorizedUser: (data: UpdateUserInput, resolve?: Resolve<UserResponse>, reject?: Reject) => {
    return createAction(ActionTypes.UPDATE_AUTHORIZED_USER, {data, resolve, reject});
  },
  searchUsers: (data: SearchUserInput) => {
    return createAction(ActionTypes.SEARCH_USERS, {data});
  },
};

export type Actions = ActionsUnion<typeof Actions>;
