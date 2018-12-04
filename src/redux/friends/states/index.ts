import { FollowRequest } from '../../../shared/models/followRequest.model';

export interface FriendsState {
  entities: FollowRequest[];
}

export const initialState: FriendsState = {
  entities: [],
};