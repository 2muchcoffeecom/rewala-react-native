import { from, Observable, ObservableInput } from 'rxjs';
import gql from 'graphql-tag';
import { execute } from 'apollo-link';
import { ReactNativeFile } from 'apollo-upload-client';

import link from '../middlewares/link.middleware';
import { question } from '../templates/question.template';
import { pagedUsers } from '../templates/user.template';

interface IQuestionService {
  createQuestion(input: CreateQuestionInput): Observable<any>;
  pagedFeed(limit: number, next?: string, previous?: string): Observable<any>;
  pagedMy(limit: number, next?: string, previous?: string): Observable<any>;
  pagedOfUser(id: string, limit: number, next?: string, previous?: string): Observable<any>;
}

export interface CreateQuestionOptionInput {
  text: string;
}

export interface CreateQuestionInput {
  title: string;
  expiredTime: number;
  background?: InstanceType<typeof ReactNativeFile>;
  memberIds?: string[];
  questionOptions: CreateQuestionOptionInput[];
}

export interface PagedQuestionInput {
  limit: number;
  next?: string;
  previous?: string;
}

export interface PagedQuestionOfUserInput extends PagedQuestionInput {
  id: string;
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

  pagedFeed(limit: number, next?: string, previous?: string) {
    const operation = {
      query: gql`
        query feedQuestions($next: String, $previous: String, $limit: Int) {
          feedQuestions(
            next: $next,
            previous: $previous,
            limit: $limit,
          ) ${pagedUsers}
        }
      `,
      variables: {
        next, previous, limit,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }

  pagedMy(limit: number, next?: string, previous?: string) {
    const operation = {
      query: gql`
        query myQuestions($next: String, $previous: String, $limit: Int) {
          myQuestions(
            next: $next,
            previous: $previous,
            limit: $limit,
          ) ${pagedUsers}
        }
      `,
      variables: {
        next, previous, limit,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }

  pagedOfUser(id: string, limit: number, next?: string, previous?: string) {
    const operation = {
      query: gql`
        query personQuestions($id: String, $next: String, $previous: String, $limit: Int) {
          personQuestions(
            id: $id,
            next: $next,
            previous: $previous,
            limit: $limit,
          ) ${pagedUsers}
        }
      `,
      variables: {
        id, next, previous, limit,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }
}

export default new QuestionService();