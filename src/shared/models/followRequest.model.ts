import { UserResponse } from './user.model';

export enum FollowRequestStatus {
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  ACCEPTED = 'ACCEPTED',
}

export class FollowRequest {
  _id: string = '';
  fromUserId: string = '';
  toUserId: string = '';
  status: FollowRequestStatus | null = null;

  constructor(obj: FollowRequest) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj[field];
      }
    }
  }
}

export interface FollowRequestResponse extends FollowRequest {
  toUser: UserResponse;
}