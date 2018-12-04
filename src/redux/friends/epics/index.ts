import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { friendsRequestAC } from '../../request/AC';

const setFriendsDataEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof friendsRequestAC.create.Actions.createFriendFollowRequestSuccess> |
    ReturnType<typeof friendsRequestAC.update.Actions.updateFriendFollowRequestSuccess>>(
    friendsRequestAC.create.ActionTypes.FRIEND_CREATE_FOLLOW_REQUEST_SUCCESS,
    friendsRequestAC.update.ActionTypes.FRIEND_UPDATE_FOLLOW_REQUEST_SUCCESS,
  ),
  map((action) => {
    const followRequests = Array.isArray(action.payload.data) ?
      action.payload.data :
      [action.payload.data];

    return fromActions.Actions.setFriendsData(followRequests);
  }),
);

const addFriendEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.ADD_FRIEND,
  ),
  map((action: ReturnType<typeof fromActions.Actions.addFriend>) => {
    const {data} = action.payload;

    return friendsRequestAC.create.Actions.createFriendFollowRequest(data);
  }),
);

const deleteFriendEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.DELETE_FRIEND,
  ),
  map((action: ReturnType<typeof fromActions.Actions.deleteFriend>) => {
    const {data} = action.payload;

    return friendsRequestAC.update.Actions.updateFriendFollowRequest(data);
  }),
);

export const friendsEpics = [
  setFriendsDataEpic,
  addFriendEpic,
  deleteFriendEpic,
];