import { user } from './user.template';

export const followRequest = `{
  _id
  fromUserId
  toUserId
  status
}`;

export const myFollowRequest = `{
  _id
  fromUserId
  toUserId
  status
  toUser ${user}
  fromUser ${user}
}`;