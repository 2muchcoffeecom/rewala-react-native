import * as authState from '../nested-states/auth/states';
import * as contactsState from '../nested-states/contacts/states';
import * as friendsState from '../nested-states/friends/states';

export interface FieldsError {
  email: {};
  password: {};
  fullName: {};
  phone: {};
  countryCode: {};
  resetPasswordCode: {};
}

export interface RequestError {
  fields?: FieldsError;
  message?: string;
}

export type Resolve<T> = (value?: T | PromiseLike<T>) => void;
export type Reject = (reason?: any) => void;

export interface RequestState {
  auth: authState.AuthRequestState;
  contacts: contactsState.ContactsRequestState;
  friends: friendsState.FriendsRequestState;
}

export const initialState: RequestState = {
  auth: authState.initialState,
  contacts: contactsState.initialState,
  friends: friendsState.initialState,
};