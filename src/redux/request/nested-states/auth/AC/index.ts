import * as login from '../nested-states/login/AC';
import * as registration from '../nested-states/registration/AC';
import * as resetPassword from '../nested-states/resetPassword/AC';
import * as resetPasswordCode from '../nested-states/resetPasswordCode/AC';

export const authRequestAC = {
  login,
  registration,
  resetPassword,
  resetPasswordCode,
};
