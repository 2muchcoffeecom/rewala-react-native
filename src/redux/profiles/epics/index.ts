import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType, StateObservable } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import {
  contactsRequestAC, authRequestAC, friendsRequestAC, usersRequestAC,
} from '../../request/AC';
import { RootState } from '../../store';

const setProfilesDataEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof contactsRequestAC.sendContacts.Actions.contactsSendSuccess> |
    ReturnType<typeof authRequestAC.login.Actions.loginSuccess> |
    ReturnType<typeof authRequestAC.registration.Actions.registrationSuccess> |
    ReturnType<typeof authRequestAC.newPassword.Actions.newPasswordSuccess> |
    ReturnType<typeof usersRequestAC.getMe.Actions.getMeSuccess> |
    ReturnType<typeof usersRequestAC.updateMe.Actions.updateMeSuccess> |
    ReturnType<typeof usersRequestAC.userFriends.Actions.getUserFriendsSuccess>>(
    contactsRequestAC.sendContacts.ActionTypes.CONTACTS_SEND_SUCCESS,
    authRequestAC.login.ActionTypes.LOGIN_SUCCESS,
    authRequestAC.registration.ActionTypes.REGISTRATION_SUCCESS,
    authRequestAC.newPassword.ActionTypes.NEW_PASSWORD_SUCCESS,
    usersRequestAC.getMe.ActionTypes.GET_ME_SUCCESS,
    usersRequestAC.updateMe.ActionTypes.UPDATE_ME_SUCCESS,
    usersRequestAC.userFriends.ActionTypes.GET_USER_FRIENDS_SUCCESS,
  ),
  map((action) => {
    const users = Array.isArray(action.payload.data) ?
      action.payload.data :
      [action.payload.data];

    return fromActions.Actions.setProfilesData(users);
  }),
);

const setProfilesDataFromFollowRequestEpic = (
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

    return fromActions.Actions.setProfilesData(users);
  }),
);

const setProfilesDataFromPagedUsersEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof usersRequestAC.search.Actions.newSearchSuccess> |
    ReturnType<typeof usersRequestAC.search.Actions.newSearchPageSuccess>>(
    usersRequestAC.search.ActionTypes.NEW_SEARCH_SUCCESS,
    usersRequestAC.search.ActionTypes.NEW_SEARCH_PAGE_SUCCESS,
  ),
  map((action) => {
    const users = action.payload.data.results;

    return fromActions.Actions.setProfilesData(users);
  }),
);

export const profilesEpics = [
  setProfilesDataEpic,
  setProfilesDataFromFollowRequestEpic,
  setProfilesDataFromPagedUsersEpic,
];