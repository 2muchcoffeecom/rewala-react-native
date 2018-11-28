import { loginRequestEpic } from '../nested-states/login/epics';
import { registrationRequestEpic } from '../nested-states/registration/epics';
import { resetPasswordRequestEpic } from '../nested-states/resetPassword/epics';
import { resetPasswordCodeRequestEpic } from '../nested-states/resetPasswordCode/epics';
import { newPasswordRequestEpic } from '../nested-states/newPassword/epics';

export const authEpic = [
  loginRequestEpic,
  registrationRequestEpic,
  resetPasswordRequestEpic,
  resetPasswordCodeRequestEpic,
  newPasswordRequestEpic,
];