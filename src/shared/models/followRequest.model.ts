export enum FollowRequestStatus {
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  ACCEPTED = 'ACCEPTED',
}

export class FollowRequest {
  _id: string;
  fromUserId: string;
  toUserId: string;
  status: FollowRequestStatus;

  constructor(obj: any) {
    for (const field in obj) {
      if (obj.hasOwnProperty(field) && typeof this[field] !== 'undefined') {
        this[field] = obj[field];
      }
    }
  }
}
