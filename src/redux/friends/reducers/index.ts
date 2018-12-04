import { unionBy } from 'lodash-es';
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

    default:
      return state;
  }
}