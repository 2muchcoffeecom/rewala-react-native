import * as login from '../nested-states/login/AC';
import * as registration from '../nested-states/registration/AC';
import * as resetPassword from '../nested-states/resetPassword/AC';
import * as resetPasswordCode from '../nested-states/resetPasswordCode/AC';
import * as newPassword from '../nested-states/newPassword/AC';
import * as changePassword from '../nested-states/changePassword/AC';
import * as logout from '../nested-states/logout/AC';

export const authRequestAC = {
  login,
  registration,
  resetPassword,
  resetPasswordCode,
  newPassword,
  changePassword,
  logout,
};
