import { avatar } from './avatar.template';

export const profile = `{
  _id
  fullName
  phone
  countryCode
  notifications
  avatarId
  avatar ${avatar}
  avatarThumb ${avatar}
  friendsCount
  rewalsCount
}`;