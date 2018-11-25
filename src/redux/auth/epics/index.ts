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
  map((action) => {
    return authRequestAC.login.Actions.login(action.payload.data);
  }),
);

export const authEpics = [
  loginEpic,
];