import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { authRequestAC } from '../../request/nested-states/auth/AC';

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

export const toastEpics = [
  showResetPasswordToastEpic,
];