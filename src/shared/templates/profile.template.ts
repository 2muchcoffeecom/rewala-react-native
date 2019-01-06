import { image } from './image.template';

export const profile = `{
  _id
  fullName
  phone
  countryCode
  notifications
  avatarId
  avatar ${image}
  avatarThumb ${image}
  friendsCount
  rewalsCount
}`;