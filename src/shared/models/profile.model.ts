import { UserResponse } from './user.model';

export class ProfileModel {
  _id: string = '';
  fullName: string = '';
  phone: string = '';
  countryCode: string = '';
  notifications: boolean = false;
  avatarPath: string = '';
  avatarThumbPath: string = '';
  userId: string = '';
  friendsCount: number = 0;
  rewalsCount: number = 0;

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

    if (obj.profile.avatarThumb) {
      this.avatarThumbPath = `${obj.profile.avatarThumb.dir}/${obj.profile.avatarThumb.filename}`;
    }
  }
}

export interface ImageResponse {
  _id: string;
  dir: string;
  filename: string;
  mimetype: string;
}

export interface ProfileResponse extends ProfileModel {
  avatar: ImageResponse;
  avatarThumb: ImageResponse;
}