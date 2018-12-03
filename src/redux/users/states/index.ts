import { IUserModel } from '../../../shared/models/user.model';

export interface UsersState {
  entities: IUserModel[];
}

export const initialState: UsersState = {
  entities: [],
};