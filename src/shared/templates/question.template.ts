import { user } from './user.template';
import { avatar } from './avatar.template';

export const questionOption = `{
  _id,
  text,
  questionId
  votes
}`;

export const question = `{
  _id
  title
  expiredTime
  background ${avatar}
  memberIds
  ownerId
  owner ${user}
  questionOptions ${questionOption}
  createdAt
  isFinished
}`;
