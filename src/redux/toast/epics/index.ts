import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { authRequestAC, usersRequestAC, questionsRequestAC } from '../../request/AC';

const showAuthErrorToastEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.login.Actions.loginFail> |
    ReturnType<typeof authRequestAC.registration.Actions.registrationFail> |
    ReturnType<typeof authRequestAC.resetPassword.Actions.resetPasswordFail> |
    ReturnType<typeof authRequestAC.resetPasswordCode.Actions.resetPasswordCodeFail> |
    ReturnType<typeof authRequestAC.newPassword.Actions.newPasswordFail> |
    ReturnType<typeof authRequestAC.logout.Actions.logoutFail> |
    ReturnType<typeof questionsRequestAC.createQuestion.Actions.createQuestionFail>>(
    authRequestAC.login.ActionTypes.LOGIN_FAIL,
    authRequestAC.registration.ActionTypes.REGISTRATION_FAIL,
    authRequestAC.resetPassword.ActionTypes.RESET_PASSWORD_FAIL,
    authRequestAC.resetPasswordCode.ActionTypes.RESET_PASSWORD_CODE_FAIL,
    authRequestAC.newPassword.ActionTypes.NEW_PASSWORD_FAIL,
    authRequestAC.logout.ActionTypes.LOGOUT_FAIL,
    questionsRequestAC.createQuestion.ActionTypes.CREATE_QUESTION_FAIL,
  ),
  map((action) => {
    const errorMessage = action.payload.errors.message;

    return fromActions.Actions.showToast(errorMessage);
  }),
);

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
  showAuthErrorToastEpic,
];