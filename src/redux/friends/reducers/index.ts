import { unionBy, uniq } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, FriendsState } from '../states';
import { FollowRequest } from '../../../shared/models/followRequest.model';

export function reducer(state = initialState, action: fromActions.Actions): FriendsState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_FRIEND_DATA: {
      const followRequests = action.payload.data.map<FollowRequest>(
        (followRequest) => new FollowRequest(followRequest),
      );

      return {
        ...state,
        entities: unionBy(followRequests, state.entities, '_id'),
      };
    }

    case fromActions.ActionTypes.SET_MY_FRIENDS_IDS: {
      const {data} = action.payload;

      return {
        ...state,
        myFriendsIds: uniq([
          ...state.myFriendsIds,
          ...data,
        ]),
      };
    }

    case fromActions.ActionTypes.DELETE_MY_FRIEND_ID: {
      const {data} = action.payload;

      return {
        ...state,
        myFriendsIds: state.myFriendsIds.filter((myFriendsId) => myFriendsId !== data),
      };
    }

    case fromActions.ActionTypes.DELETE_ALL_MY_FRIEND_IDS: {

      return {
        ...state,
        myFriendsIds: [],
      };
    }

    default:
      return state;
  }
}