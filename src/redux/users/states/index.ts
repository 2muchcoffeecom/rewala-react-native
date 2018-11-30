import { IUserModelWithToken } from '../../../shared/models/user.model';

export interface FriendsState {
  entities: IUserModelWithToken[];
}

export const initialState: FriendsState = {
  entities: [],
};