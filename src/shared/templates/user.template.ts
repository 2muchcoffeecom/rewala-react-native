import { profile } from './profile.template';

export const user = `{
  _id
  email
  profile ${profile}
  status
  statusIn
}`;

export const userWithProfile = `{
  _id
  email
  authToken
  profile ${profile}
  roles
  status
  statusIn
  followRequestWithMe
}`;

export const result = `{
  result
  error
}`;
