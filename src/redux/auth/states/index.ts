export interface AuthState {
  authorizedUserId: string;
}

export const initialState: AuthState = {
  authorizedUserId: '',
};