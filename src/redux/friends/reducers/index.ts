import { unionBy } from 'lodash-es';
import * as fromActions from '../AC';
import { initialState, UsersState } from '../states';
import { FollowRequest } from '../../../shared/models/followRequest.model';

export function reducer(state = initialState, action: fromActions.Actions): UsersState {

  switch (action.type) {
    case fromActions.ActionTypes.SET_FOLLOW_REQUEST_DATA: {
      const followRequests = action.payload.data.map<FollowRequest>(
        (followRequest) => new FollowRequest(followRequest),
      );

      return {
        ...state,
        entities: unionBy(users, state.entities, '_id'),
      };
    }

    default:
      return state;
  }
}