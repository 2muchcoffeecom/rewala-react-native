import { UserResponse } from './user.model';

export class ProfileModel {
  _id: string = '';
  fullName: string = '';
  phone: string = '';
  countryCode: string = '';
  notifications: boolean = false;
  avatarPath: string = '';
  userId: string = '';

  constructor(obj: UserResponse) {
    for (const field in obj.profile) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj.profile[field];
      }
    }

    if (obj._id) {
      this.userId = obj._id;
    }

    if (obj.profile.avatar) {
      this.avatarPath = `${obj.profile.avatar.dir}/${obj.profile.avatar.filename}`;
    }
  }
}

export interface ProfileResponse extends ProfileModel {
  avatar: {
    _id: string,
    dir: string,
    filename: string
    mimetype: string,
  };
}