import * as authState from '../nested-states/auth/states';

export interface RequestError {
  message: string[] | string;
}

export interface RequestState {
  auth: authState.AuthRequestState;
}

export const initialState: RequestState = {
  auth: authState.initialState,
};