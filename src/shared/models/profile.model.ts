export interface IProfileModel {
  _id: string;
  fullName: string;
  countryCode: string;
  phone: string;
  notifications: boolean;
  userId: string;
}

export class ProfileModel {
  _id?: string;
  fullName?: string;
  phone?: string;
  notifications?: boolean;
  userId?: string;
  avatarId?: string;

  constructor(obj?: any) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj && obj[field];
      }
    }
  }
}
