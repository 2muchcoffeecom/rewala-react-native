import { ProfileResponse } from './profile.model';

export class UserModel {
  _id: string = '';
  email: string = '';
  profileId: string = '';

  constructor(obj: UserResponse) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj[field];
      }
    }

    if (obj.profile && obj.profile._id) {
      this.profileId = obj.profile._id;
    }
  }
}

export class UserModelWithToken extends UserModel {
  authToken: string;
}

export interface UserResponse extends UserModelWithToken {
  profile: ProfileResponse;
}