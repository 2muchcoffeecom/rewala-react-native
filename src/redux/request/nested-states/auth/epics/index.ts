import { loginRequestEpic } from '../nested-states/login/epics';
import { registrationRequestEpic } from '../nested-states/registration/epics';

export const authEpic = [
  loginRequestEpic,
  registrationRequestEpic,
];