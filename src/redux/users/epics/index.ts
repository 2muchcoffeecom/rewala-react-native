import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType, StateObservable } from 'redux-observable';
import { debounceTime, map } from 'rxjs/operators';
import * as fromActions from '../AC';
import {
  contactsRequestAC, authRequestAC, friendsRequestAC, usersRequestAC,
} from '../../request/AC';
import { RootState } from '../../store';

const setUsersDataEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof contactsRequestAC.sendContacts.Actions.contactsSendSuccess> |
    ReturnType<typeof authRequestAC.login.Actions.loginSuccess> |
    ReturnType<typeof authRequestAC.registration.Actions.registrationSuccess> |
    ReturnType<typeof authRequestAC.newPassword.Actions.newPasswordSuccess> |
    ReturnType<typeof usersRequestAC.getMe.Actions.getMeSuccess> |
    ReturnType<typeof usersRequestAC.updateMe.Actions.updateMeSuccess>>(
    contactsRequestAC.sendContacts.ActionTypes.CONTACTS_SEND_SUCCESS,
    authRequestAC.login.ActionTypes.LOGIN_SUCCESS,
    authRequestAC.registration.ActionTypes.REGISTRATION_SUCCESS,
    authRequestAC.newPassword.ActionTypes.NEW_PASSWORD_SUCCESS,
    usersRequestAC.getMe.ActionTypes.GET_ME_SUCCESS,
    usersRequestAC.updateMe.ActionTypes.UPDATE_ME_SUCCESS,
  ),
  map((action) => {
    const users = Array.isArray(action.payload.data) ?
      action.payload.data :
      [action.payload.data];

    return fromActions.Actions.setUsersData(users);
  }),
);

const setUsersDataFromFollowRequestEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) => action$.pipe(
  ofType<ReturnType<typeof friendsRequestAC.getMyFriends.Actions.getMyFriendFollowRequestSuccess>>(
    friendsRequestAC.getMyFriends.ActionTypes.FRIEND_GET_MY_FOLLOW_REQUEST_SUCCESS,
  ),
  map((action) => {
    const users = action.payload.data.map(
      (followRequest) => {
        const {authorizedUserId} = state$.value.auth;

        return followRequest.toUserId === authorizedUserId ? followRequest.fromUser : followRequest.toUser;
      },
    );

    return fromActions.Actions.setUsersData(users);
  }),
);

const getAuthorizedUserEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.GET_AUTHORIZED_USER,
  ),
  map(() => usersRequestAC.getMe.Actions.getMe()),
);

const updateAuthorizedUserEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.UPDATE_AUTHORIZED_USER,
  ),
  map((action: ReturnType<typeof fromActions.Actions.updateAuthorizedUser>) => {
    const {data, resolve, reject} = action.payload;

    return usersRequestAC.updateMe.Actions.updateMe(data, resolve, reject);
  }),
);

const searchUsersEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.SEARCH_USERS,
  ),
  debounceTime(500),
  map((action: ReturnType<typeof fromActions.Actions.searchUsers>) => {
    const {data} = action.payload;

    if (data.next) {
      return usersRequestAC.search.Actions.newSearchPage(data);
    } else {
      return usersRequestAC.search.Actions.newSearch(data);
    }
  }),
);

const setUsersDataFromPagedUsersEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof usersRequestAC.search.Actions.newSearchSuccess> |
    ReturnType<typeof usersRequestAC.search.Actions.newSearchPageSuccess>>(
    usersRequestAC.search.ActionTypes.NEW_SEARCH_SUCCESS,
    usersRequestAC.search.ActionTypes.NEW_SEARCH_PAGE_SUCCESS,
  ),
  map((action) => {
    const users = action.payload.data.results;

    return fromActions.Actions.setUsersData(users);
  }),
);

const setPagedUsersIdsEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof usersRequestAC.search.Actions.newSearchSuccess> |
    ReturnType<typeof usersRequestAC.search.Actions.newSearchPageSuccess>>(
    usersRequestAC.search.ActionTypes.NEW_SEARCH_SUCCESS,
    usersRequestAC.search.ActionTypes.NEW_SEARCH_PAGE_SUCCESS,
  ),
  map((action) => {
    const pagedUsersData = action.payload.data;

    if (action.type === usersRequestAC.search.ActionTypes.NEW_SEARCH_SUCCESS) {
      return fromActions.Actions.setPagedUsersIdsAfterNewSearch(pagedUsersData);
    } else {
      return fromActions.Actions.setPagedUsersIdsAfterNewSearchPage(pagedUsersData);
    }
  }),
);

const setPagedUsersOptionsEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof usersRequestAC.search.Actions.newSearchSuccess> |
    ReturnType<typeof usersRequestAC.search.Actions.newSearchPageSuccess>>(
    usersRequestAC.search.ActionTypes.NEW_SEARCH_SUCCESS,
    usersRequestAC.search.ActionTypes.NEW_SEARCH_PAGE_SUCCESS,
  ),
  map((action) => {
    const pagedUsersData = action.payload.data;

    return fromActions.Actions.setPagedUsersOptions(pagedUsersData);
  }),
);

export const usersEpics = [
  setUsersDataEpic,
  setUsersDataFromFollowRequestEpic,
  getAuthorizedUserEpic,
  updateAuthorizedUserEpic,
  searchUsersEpic,
  setUsersDataFromPagedUsersEpic,
  setPagedUsersIdsEpic,
  setPagedUsersOptionsEpic,
];