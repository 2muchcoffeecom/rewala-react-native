export class ProfileModel {
  _id: string;
  fullName: string;
  phone: string;
  countryCode: string;
  notifications: boolean;
  avatarId: string;

  constructor(obj: any) {
    for (const field in obj) {
      if (obj.hasOwnProperty(field) && typeof this[field] !== 'undefined') {
        this[field] = obj[field];
      }
    }
  }
}
