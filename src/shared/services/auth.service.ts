import { from, Observable, ObservableInput } from 'rxjs';
import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import { execute } from 'apollo-link';

import link from '../middlewares/link.middleware';
import { userWithProfile } from '../templates/user.template';

export interface LoginInput {
  email: string;
  password: string;
}

interface ProfileInput {
  fullName: string;
  phone: string;
}

export interface UserInput {
  email: string;
  password: string;
  profileInput: ProfileInput;
}

interface IAuthService {
  getToken(): Observable<string | null>;
  setToken(token: string): Observable<void>;
  removeToken(): Observable<void>;
  login(input: LoginInput): Observable<any>;
  registration(input: UserInput): Observable<any>;
}

class AuthService implements IAuthService {
  getToken() {
    return from(AsyncStorage.getItem('auth_token'));
  }

  setToken(token: string) {
    return from(AsyncStorage.setItem('auth_token', token));
  }

  removeToken() {
    return from(AsyncStorage.removeItem('auth_token'));
  }

  login(input: LoginInput) {
    const operation = {
      query: gql`
          mutation login($input: LoginInput) {
              login(input: $input) ${userWithProfile}
          }
      `,
      variables: {
        input,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }

  registration(input: UserInput) {
    const operation = {
      query: gql`
          mutation registration($input: UserInput) {
              registration(input: $input) ${userWithProfile}
          }
      `,
      variables: {
        input,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }
}

export default new AuthService();