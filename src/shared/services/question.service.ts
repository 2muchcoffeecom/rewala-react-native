import { from, Observable, ObservableInput } from 'rxjs';
import gql from 'graphql-tag';
import { execute } from 'apollo-link';
import { ReactNativeFile } from 'apollo-upload-client';

import link from '../middlewares/link.middleware';
import { question } from '../templates/question.template';

interface  CreateQuestionOptionInput {
  text: string;
}

interface CreateQuestionInput {
  title: string;
  expiredTime: number;
  background: InstanceType<typeof ReactNativeFile>;
  memberIds: string[];
  questionOptions: CreateQuestionOptionInput[];
}

interface IQuestionService {
  createQuestion(input: CreateQuestionInput): Observable<any>;
}

class QuestionService implements IQuestionService {
  createQuestion(input: CreateQuestionInput) {
    const operation = {
      query: gql`
        mutation createQuestion($input: CreateQuestionInput) {
          createQuestion(input: $input) ${question}
        }
      `,
      variables: {
        input,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }
}

export default new QuestionService();