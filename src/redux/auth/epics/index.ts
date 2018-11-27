import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { ignoreElements, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../AC';
import { authRequestAC } from '../../request/nested-states/auth/AC';
import authService from '../../../shared/services/auth.service';

const loginEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.AUTH_SUBMIT_LOGIN,
  ),
  map((action: ReturnType<typeof fromActions.Actions.submitLogin>) => {
    return authRequestAC.login.Actions.login(action.payload.data);
  }),
);

const registrationEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.AUTH_SUBMIT_REGISTRATION,
  ),
  map((action: ReturnType<typeof fromActions.Actions.submitRegistration>) => {
    return authRequestAC.registration.Actions.registration(action.payload.data);
  }),
);

const setTokenEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof authRequestAC.login.Actions.loginSuccess> |
    ReturnType<typeof authRequestAC.registration.Actions.registrationSuccess>>(
    authRequestAC.login.ActionTypes.LOGIN_SUCCESS,
    authRequestAC.registration.ActionTypes.REGISTRATION_SUCCESS,
  ),
  switchMap((action) => {
    const user = action.payload.data;
    return authService.setToken(user.authToken);
  }),
  ignoreElements(),
  )
;

export const authEpics = [
  loginEpic,
  registrationEpic,
  setTokenEpic,
];