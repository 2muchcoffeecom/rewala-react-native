import { UserModel } from '../../../shared/models/user.model';

export interface RequestError {
  message: string[] | string;
}

export interface RequestNestedState {
  loading: boolean;
  loaded: boolean;
  errors: RequestError | null;
  data: UserModel[] | UserModel | null;
}