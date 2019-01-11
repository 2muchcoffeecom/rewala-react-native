import { UserModel } from '../../../shared/models/user.model';

export interface UsersState {
  pagedUsersIds: string[];
  userFriendsIds: string[];
  entities: UserModel[];
}

export const initialState: UsersState = {
  pagedUsersIds: [],
  userFriendsIds: [],
  entities: [],
};