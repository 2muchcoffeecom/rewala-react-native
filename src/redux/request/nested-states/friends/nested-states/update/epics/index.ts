import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import friendService from '../../../../../../../shared/services/friend.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const friendUpdateFollowRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.FRIEND_UPDATE_FOLLOW_REQUEST),
  switchMap((action: ReturnType<typeof fromActions.Actions.updateFriendFollowRequest>) =>
    friendService.updateFollowRequest(action.payload.data).pipe(
      map((resp: GraphQlResponse) => {
        if (resp.errors) {

          return fromActions.Actions.updateFriendFollowRequestFail(resp.errors[0]);
        } else {

          return fromActions.Actions.updateFriendFollowRequestSuccess(resp.data.updateFollowRequest);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.updateFriendFollowRequestFail(errors));
      }),
    ),
  ),
);