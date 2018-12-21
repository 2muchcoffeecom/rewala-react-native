import * as authState from '../nested-states/auth/states';
import * as contactsState from '../nested-states/contacts/states';
import * as friendsState from '../nested-states/friends/states';
import * as usersState from '../nested-states/users/states';

import { FollowRequest, FollowRequestResponse } from '../../../shared/models/followRequest.model';
import { UserResponse } from '../../../shared/models/user.model';
import { PagedUserModel } from '../../../shared/models/pagedUser.model';

export interface FieldsError {
  email: {};
  password: {};
  oldPassword: {};
  newPassword: {};
  fullName: {};
  phone: {};
  countryCode: {};
  resetPasswordCode: {};
}

export interface RequestError {
  fields?: FieldsError;
  message?: string;
}

export interface GraphQlResponse {
  errors?: RequestError[];
  data: {
    login: UserResponse,
    registration: UserResponse,
    resetPasswordConfirm: UserResponse,
    resetPassword: boolean,
    resetPasswordConfirmCode: boolean,
    importContacts: UserResponse[],
    createFollowRequest: FollowRequest,
    updateFollowRequest: FollowRequest,
    myFollowRequests: FollowRequestResponse[],
    me: UserResponse,
    updateMe: UserResponse,
    changePassword: UserResponse,
    logout: boolean,
    search: PagedUserModel,
    userFriends: UserResponse[],
  };
}

export type Resolve<T> = (value?: T | PromiseLike<T>) => void;
export type Reject = (reason?: any) => void;

export interface RequestState {
  auth: authState.AuthRequestState;
  contacts: contactsState.ContactsRequestState;
  friends: friendsState.FriendsRequestState;
  users: usersState.UsersRequestState;
}

export const initialState: RequestState = {
  auth: authState.initialState,
  contacts: contactsState.initialState,
  friends: friendsState.initialState,
  users: usersState.initialState,
};