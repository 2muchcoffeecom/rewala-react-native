import { from, Observable, ObservableInput } from 'rxjs';
import gql from 'graphql-tag';
import { execute } from 'apollo-link';
import { ReactNativeFile } from 'apollo-upload-client';

import link from '../middlewares/link.middleware';
import { user } from '../templates/user.template';

interface ProfileInput {
  fullName: string;
  phone?: string;
  countryCode?: string;
  notifications: boolean;
  avatar: InstanceType<typeof ReactNativeFile>;
}

export interface UpdateUserInput {
  email: string;
  profileInput: ProfileInput;
}

interface IUserService {
  getMe(): Observable<any>;
  updateMe(input: UpdateUserInput): Observable<any>;
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
}

export default new UserService();