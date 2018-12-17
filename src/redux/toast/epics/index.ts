import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { authRequestAC, usersRequestAC } from '../../request/AC';

const showResetPasswordToastEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.resetPassword.Actions.resetPasswordSuccess>>(
    authRequestAC.resetPassword.ActionTypes.RESET_PASSWORD_SUCCESS,
  ),
  map(() => {
      return fromActions.Actions.showToast(
        'The verification code was sent to your account email address.',
      );
  }),
);

const showUserUpdateToastEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof usersRequestAC.updateMe.Actions.updateMeSuccess> |
    ReturnType<typeof authRequestAC.changePassword.Actions.changePasswordSuccess>>(
    usersRequestAC.updateMe.ActionTypes.UPDATE_ME_SUCCESS,
    authRequestAC.changePassword.ActionTypes.CHANGE_PASSWORD_SUCCESS,
  ),
  map(() => {
      return fromActions.Actions.showToast(
        'Changes have been saved successfully',
      );
  }),
);

export const toastEpics = [
  showResetPasswordToastEpic,
  showUserUpdateToastEpic,
];