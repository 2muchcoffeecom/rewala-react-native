import { unionBy, uniq } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, FriendsState } from '../states';
import { FollowRequest } from '../../../shared/models/followRequest.model';

export function reducer(state = initialState, action: fromActions.Actions): FriendsState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_FRIEND_DATA: {
      const followRequestsFromAction = action.payload.data.map<FollowRequest>(
        (followRequest) => new FollowRequest(followRequest),
      );

      const entities = unionBy(state.entities, followRequestsFromAction, '_id');
      const newEntities = entities.map<FollowRequest>((entity) => {
        const newFollowRequest = followRequestsFromAction.find(
          followRequestFromAction => followRequestFromAction._id === entity._id,
        );

        return newFollowRequest ? Object.assign({}, entity, newFollowRequest) : entity;
      });

      return {
        ...state,
        entities: newEntities,
      };
    }

    case fromActions.ActionTypes.DELETE_FRIEND_DATA: {
      const {data} = action.payload;

      return {
        ...state,
        entities: state.entities.filter((entity) => entity._id !== data._id),
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