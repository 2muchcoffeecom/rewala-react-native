import { UserResponse } from './user.model';
import { ImageResponse } from './profile.model';
import { QuestionOptionModel } from './questionOption.model';

export class QuestionModel {
  _id: string = '';
  title: string = '';
  titleColor: string = '';
  expiredTime: number = 0;
  backgroundPath: string = '';
  memberIds: string[] = [];
  ownerId: string = '';
  questionOptionIds: string[] = [];
  createdAt: string = '';
  isFinished: boolean = false;

  constructor(obj: QuestionResponse) {
    for (const field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj[field];
      }
    }

    if (obj.background) {
      this.backgroundPath = `${obj.background.dir}/${obj.background.filename}`;
    }

    if (obj.questionOptions) {
      this.questionOptionIds = obj.questionOptions.map<string>(
        questionOption => questionOption._id,
      );
    }
  }
}

export interface QuestionResponse extends QuestionModel {
  owner: UserResponse;
  background: ImageResponse;
  questionOptions: QuestionOptionModel[];
}