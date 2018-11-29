import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { ignoreElements, map, switchMap, tap } from 'rxjs/operators';
import * as fromActions from '../AC';
import { authRequestAC } from '../../request/nested-states/auth/AC';
import authService from '../../../shared/services/auth.service';
import navService from '../../../shared/services/nav.service';

const loginEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.AUTH_SUBMIT_LOGIN,
  ),
  map((action: ReturnType<typeof fromActions.Actions.submitLogin>) => {
    const {data, resolve, reject} = action.payload;

    return authRequestAC.login.Actions.login(data, resolve, reject);
  }),
);

const redirectToLoginScreenEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.newPassword.Actions.newPasswordSuccess>>(
    authRequestAC.newPassword.ActionTypes.NEW_PASSWORD_SUCCESS,
  ),
  tap(() => navService.navigate('LoginScreen')),
  ignoreElements(),
);

const registrationEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.AUTH_SUBMIT_REGISTRATION,
  ),
  map((action: ReturnType<typeof fromActions.Actions.submitRegistration>) => {
    return authRequestAC.registration.Actions.registration(action.payload.data);
  }),
);

const resetPasswordEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.AUTH_SUBMIT_RESET_PASSWORD,
  ),
  map((action: ReturnType<typeof fromActions.Actions.submitResetPassword>) => {
    return authRequestAC.resetPassword.Actions.resetPassword(action.payload.data);
  }),
);

const resetPasswordCodeEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.AUTH_SUBMIT_RESET_PASSWORD_CODE,
  ),
  map((action: ReturnType<typeof fromActions.Actions.submitResetPasswordCode>) => {
    return authRequestAC.resetPasswordCode.Actions.resetPasswordCode(action.payload.data);
  }),
);

const redirectToResetPasswordCodeScreenEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.resetPassword.Actions.resetPasswordSuccess>>(
    authRequestAC.resetPassword.ActionTypes.RESET_PASSWORD_SUCCESS,
  ),
  tap(() => navService.navigate('ResetPasswordCodeScreen')),
  ignoreElements(),
);

const newPasswordEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.AUTH_SUBMIT_NEW_PASSWORD,
  ),
  map((action: ReturnType<typeof fromActions.Actions.submitNewPassword>) => {
    return authRequestAC.newPassword.Actions.newPassword(action.payload.data);
  }),
);

const redirectToNewPasswordScreenEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.resetPasswordCode.Actions.resetPasswordCodeSuccess>>(
    authRequestAC.resetPasswordCode.ActionTypes.RESET_PASSWORD_CODE_SUCCESS,
  ),
  tap(() => navService.navigate('NewPasswordScreen')),
  ignoreElements(),
);

const setTokenEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.login.Actions.loginSuccess> |
    ReturnType<typeof authRequestAC.registration.Actions.registrationSuccess> |
    ReturnType<typeof authRequestAC.newPassword.Actions.newPasswordSuccess>>(
    authRequestAC.login.ActionTypes.LOGIN_SUCCESS,
    authRequestAC.registration.ActionTypes.REGISTRATION_SUCCESS,
    authRequestAC.newPassword.ActionTypes.NEW_PASSWORD_SUCCESS,
  ),
  switchMap((action) => {
    const user = action.payload.data;
    return authService.setToken(user.authToken);
  }),
  ignoreElements(),
);

const setAuthorizedUserIdEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.login.Actions.loginSuccess> |
    ReturnType<typeof authRequestAC.registration.Actions.registrationSuccess>>(
    authRequestAC.login.ActionTypes.LOGIN_SUCCESS,
    authRequestAC.registration.ActionTypes.REGISTRATION_SUCCESS,
  ),
  map((action) => {
    const user = action.payload.data;
    return fromActions.Actions.setAuthorizedUserId(user._id);
  }),
);

const redirectToHomeScreenEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.login.Actions.loginSuccess>>(
    authRequestAC.login.ActionTypes.LOGIN_SUCCESS,
  ),
  tap(() => navService.navigate('HomeScreen')),
  ignoreElements(),
);

export const authEpics = [
  loginEpic,
  registrationEpic,
  setTokenEpic,
  setAuthorizedUserIdEpic,
  resetPasswordEpic,
  resetPasswordCodeEpic,
  newPasswordEpic,
  redirectToLoginScreenEpic,
  redirectToResetPasswordCodeScreenEpic,
  redirectToNewPasswordScreenEpic,
  redirectToHomeScreenEpic,
];