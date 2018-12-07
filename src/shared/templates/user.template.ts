import { profile } from './profile.template';

export const user = `{
  _id
  email
  profile ${profile}
}`;

export const userWithToken = `{
  _id
  email
  authToken
  profile ${profile}
}`;
