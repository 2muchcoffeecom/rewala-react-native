import * as authState from '../nested-states/auth/states';

export interface RequestError {
  fields?: {
    email?: {
      unique?: string;
    },
  };
  message?: string;
}

export interface RequestState {
  auth: authState.AuthRequestState;
}

export const initialState: RequestState = {
  auth: authState.initialState,
};