import { user } from './user.template';
import { image } from './image.template';
import { questionOption } from './questionOption.template';

export const question = `{
  _id
  title
  expiredTime
  background ${image}
  memberIds
  ownerId
  owner ${user}
  questionOptions ${questionOption}
  createdAt
  isFinished
}`;
