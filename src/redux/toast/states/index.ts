export interface ToastState {
  message: string | null;
}

export const initialState: ToastState = {
  message: null,
};