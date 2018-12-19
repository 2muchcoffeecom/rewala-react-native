import { from, Observable, ObservableInput } from 'rxjs';
import gql from 'graphql-tag';
import { execute } from 'apollo-link';
import { ReactNativeFile } from 'apollo-upload-client';

import link from '../middlewares/link.middleware';
import { user, pagedUsers } from '../templates/user.template';

interface ProfileInput {
  fullName?: string;
  phone?: string;
  countryCode?: string;
  notifications?: boolean;
  avatar?: InstanceType<typeof ReactNativeFile>;
}

export interface UpdateUserInput {
  email?: string;
  profileInput: ProfileInput;
}

export interface SearchUserInput {
  fullName: string;
  limit: number;
  next?: string;
  previous?: string;
}

interface IUserService {
  getMe(): Observable<any>;
  updateMe(input: UpdateUserInput): Observable<any>;
  search(fullName: string, limit: number, next?: string, previous?: string): Observable<any>;
}

class UserService implements IUserService {

  getMe() {
    const operation = {
      query: gql`
        query {
          me ${user}
        }
      `,
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }

  updateMe(input: UpdateUserInput) {
    const operation = {
      query: gql`
        mutation updateMe($input: UpdateUserInput) {
          updateMe(input: $input) ${user}
        }
      `,
      variables: {
        input,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }

  search(fullName: string, limit: number, next?: string, previous?: string) {
    const operation = {
      query: gql`
        query search($fullName: String, $next: String, $previous: String, $limit: Int) {
          search(
            fullName: $fullName,
            next: $next,
            previous: $previous,
            limit: $limit,
          ) ${pagedUsers}
        }
      `,
      variables: {
        fullName, next, previous, limit,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }
}

export default new UserService();