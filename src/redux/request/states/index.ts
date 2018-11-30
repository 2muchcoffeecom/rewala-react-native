import * as authState from '../nested-states/auth/states';

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
}

export const initialState: RequestState = {
  auth: authState.initialState,
};