import { IProfileModel } from './profile.model';

export interface IUserModel {
  _id: string;
  email: string;
  authToken: string;
  profile: IProfileModel;
}

export class UserModel {
  _id?: string;
  email?: string;
  authToken?: string;
  profileId?: string;
  roles?: {
    admin: boolean,
    regular: boolean,
  };
  followRequestWithMeId?: string;
  // status
  // statusIn

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
