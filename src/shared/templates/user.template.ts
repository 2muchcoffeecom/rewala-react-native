import { profile } from './profile.template';

export const user = `{
  _id
  email
  profile ${profile}
  status
  statusIn
}`;

export const userWithToken = `{
  _id
  email
  authToken
  profile ${profile}
  status
  statusIn
}`;

export const result = `{
  result
  error
}`;
