import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { authRequestAC } from '../../request/nested-states/auth/AC';

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

export const authEpics = [
  loginEpic,
  registrationEpic,
];