import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import friendService from '../../../../../../../shared/services/friend.service';
import * as fromActions from '../AC';
import { GraphQlResponse } from '../../../../../states';

export const friendCreateFollowRequestEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(fromActions.ActionTypes.FRIEND_CREATE_FOLLOW_REQUEST),
  switchMap((action: ReturnType<typeof fromActions.Actions.createFriendFollowRequest>) =>
    friendService.createFollowRequest({toUserId: action.payload.data}).pipe(
      map((resp: GraphQlResponse) => {
        if (resp.errors) {

          return fromActions.Actions.createFriendFollowRequestFail(resp.errors[0]);
        } else {

          return fromActions.Actions.createFriendFollowRequestSuccess(resp.data.createFollowRequest);
        }
      }),
      catchError((errors) => {
        return of(fromActions.Actions.createFriendFollowRequestFail(errors));
      }),
    ),
  ),
);