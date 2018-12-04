import { FollowRequest } from '../../../shared/models/followRequest.model';

export interface UsersState {
  entities: FollowRequest[];
}

export const initialState: UsersState = {
  entities: [],
};