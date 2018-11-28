export interface AuthState {
  authorizedUserId: string | null;
}

export const initialState: AuthState = {
  authorizedUserId: null,
};