import { FollowRequest } from '../../../shared/models/followRequest.model';

export interface FriendsState {
  entities: FollowRequest[];
  myFriendsIds: string[];
}

export const initialState: FriendsState = {
  entities: [],
  myFriendsIds: [],
};