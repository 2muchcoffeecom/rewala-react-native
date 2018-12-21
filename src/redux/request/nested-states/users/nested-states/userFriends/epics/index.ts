import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import userService from '../../../../../../../shared/services/user.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const getUserFriendsRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.GET_USER_FRIENDS),
  switchMap((action: ReturnType<typeof fromActions.Actions.getUserFriends>) =>
    userService.getUserFriends(action.payload.data).pipe(
      map((resp: GraphQlResponse) => {
        console.log(resp);
        if (resp.errors) {

          return fromActions.Actions.getUserFriendsFail(resp.errors[0]);
        } else {

          return fromActions.Actions.getUserFriendsSuccess(resp.data.userFriends);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.getUserFriendsFail(errors));
      }),
    ),
  ),
);