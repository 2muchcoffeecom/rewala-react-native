import { FormState } from 'redux-form';

export interface FormsState {
  login: FormState;
  registration: FormsState;
  forgotPassword: FormsState;
  newPassword: FormsState;
  resetPasswordCode: FormsState;
  ProfileSettings: FormsState;
  changePassword: FormsState;
  addRewal: FormsState;
}
