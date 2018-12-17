import { Action } from 'redux';
import { Observable } from 'rxjs';
import { ofType, StateObservable } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as fromActions from '../AC';
import { friendsRequestAC } from '../../request/AC';
import { FollowRequestStatus } from '../../../shared/models/followRequest.model';
import { RootState } from '../../store';

const setFriendsDataEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<ReturnType<typeof friendsRequestAC.create.Actions.createFriendFollowRequestSuccess> |
    ReturnType<typeof friendsRequestAC.update.Actions.updateFriendFollowRequestSuccess> |
    ReturnType<typeof friendsRequestAC.getMyFriends.Actions.getMyFriendFollowRequestSuccess>>(
    friendsRequestAC.create.ActionTypes.FRIEND_CREATE_FOLLOW_REQUEST_SUCCESS,
    friendsRequestAC.update.ActionTypes.FRIEND_UPDATE_FOLLOW_REQUEST_SUCCESS,
    friendsRequestAC.getMyFriends.ActionTypes.FRIEND_GET_MY_FOLLOW_REQUEST_SUCCESS,
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

const updateFriendEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.UPDATE_FRIEND,
  ),
  map((action: ReturnType<typeof fromActions.Actions.updateFriend>) => {
    const {data} = action.payload;

    return friendsRequestAC.update.Actions.updateFriendFollowRequest(data);
  }),
);

const getMyFriendsEpic = (action$: Observable<Action>) => action$.pipe(
  ofType<fromActions.Actions>(
    fromActions.ActionTypes.GET_MY_FRIENDS,
  ),
  map(() => friendsRequestAC.getMyFriends.Actions.getMyFriendFollowRequest()),
);

const setMyFriendsIdsEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
  ofType<ReturnType<typeof friendsRequestAC.getMyFriends.Actions.getMyFriendFollowRequestSuccess> |
    ReturnType<typeof friendsRequestAC.update.Actions.updateFriendFollowRequestSuccess>>(
    friendsRequestAC.getMyFriends.ActionTypes.FRIEND_GET_MY_FOLLOW_REQUEST_SUCCESS,
    friendsRequestAC.update.ActionTypes.FRIEND_UPDATE_FOLLOW_REQUEST_SUCCESS,
  ),
  map((action) => {
    const {authorizedUserId} = state$.value.auth;

    if (action.type === friendsRequestAC.getMyFriends.ActionTypes.FRIEND_GET_MY_FOLLOW_REQUEST_SUCCESS) {
      const myFriendsIds = action.payload.data
        .filter((followRequest) => followRequest.status === FollowRequestStatus.ACCEPTED)
        .map((friend) => {

          return friend.toUserId !== authorizedUserId ? friend.toUserId : friend.fromUserId;
        });

      return fromActions.Actions.setMyFriendsIds(myFriendsIds);
    } else {
      const updatedFriend = action.payload.data;
      const friendId = updatedFriend.toUserId === authorizedUserId ?
        updatedFriend.fromUserId :
        updatedFriend.toUserId;

      if (updatedFriend.status === FollowRequestStatus.DECLINED) {
        return fromActions.Actions.deleteMyFriendId(friendId);
      } else if (updatedFriend.status === FollowRequestStatus.ACCEPTED) {
        return fromActions.Actions.setMyFriendsIds([friendId]);
      } else {
        return fromActions.Actions.setMyFriendsIds([]);
      }
    }
  }),
);

export const friendsEpics = [
  setFriendsDataEpic,
  addFriendEpic,
  updateFriendEpic,
  getMyFriendsEpic,
  setMyFriendsIdsEpic,
];