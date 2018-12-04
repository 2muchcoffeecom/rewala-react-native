import { UserModel } from '../../../shared/models/user.model';

export interface UsersState {
  entities: UserModel[];
}

export const initialState: UsersState = {
  entities: [],
};