import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import friendService from '../../../../../../../shared/services/friend.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const friendGetMyFollowRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.FRIEND_GET_MY_FOLLOW_REQUEST),
  switchMap((action: ReturnType<typeof fromActions.Actions.getMyFriendFollowRequest>) =>
    friendService.getMyFollowRequest().pipe(
      map((resp: GraphQlResponse) => {
        if (resp.errors) {

          return fromActions.Actions.getMyFriendFollowRequestFail(resp.errors[0]);
        } else {

          return fromActions.Actions.getMyFriendFollowRequestSuccess(resp.data.myFollowRequests);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.getMyFriendFollowRequestFail(errors));
      }),
    ),
  ),
);