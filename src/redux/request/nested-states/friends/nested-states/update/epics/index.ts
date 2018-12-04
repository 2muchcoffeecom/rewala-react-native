import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import friendService from '../../../../../../../shared/services/friend.service';
import * as fromActions from '../AC';
import { FetchResult } from 'apollo-link';

export const friendUpdateFollowRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.FRIEND_UPDATE_FOLLOW_REQUEST),
  switchMap((action: ReturnType<typeof fromActions.Actions.updateFriendFollowRequest>) =>
    friendService.updateFollowRequest(action.payload.data).pipe(
      map((resp: FetchResult) => {
        if (resp.errors) {

          return fromActions.Actions.updateFriendFollowRequestFail(resp.errors.pop());
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