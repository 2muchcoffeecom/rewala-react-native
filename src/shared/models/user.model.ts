import { IProfileModel } from './profile.model';

export interface IUserModel {
  _id: string;
  email: string;
  profile: IProfileModel;
}

export interface IUserModelWithToken extends IUserModel{
  authToken: string;
}