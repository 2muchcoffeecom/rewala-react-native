import { UserModel } from '../../../shared/models/user.model';

export interface PagedUsersOptions {
  next: string | null;
  hasNext: boolean;
  previous: string | null;
  hasPrevious: boolean;
}

export interface UsersState {
  pagedUsersIds: string[];
  pagedUsersOptions: PagedUsersOptions;
  userFriendsIds: string[];
  entities: UserModel[];
}

export const initialState: UsersState = {
  pagedUsersIds: [],
  pagedUsersOptions: {
    next: null,
    hasNext: false,
    previous: null,
    hasPrevious: false,
  },
  userFriendsIds: [],
  entities: [],
};