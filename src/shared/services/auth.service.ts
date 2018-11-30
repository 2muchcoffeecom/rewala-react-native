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
  countryCode: string;
}

export interface UserInput {
  email: string;
  password: string;
  profileInput: ProfileInput;
}

export interface ResetPasswordConfirmInput {
  password: string;
  resetPasswordCode: string;
}

interface IAuthService {
  getToken(): Observable<string | null>;
  setToken(token: string): Observable<void>;
  removeToken(): Observable<void>;
  login(input: LoginInput): Observable<any>;
  registration(input: UserInput): Observable<any>;
  resetPassword(email: string): Observable<any>;
  resetPasswordConfirmCode(resetPasswordCode: string): Observable<any>;
  newPassword(resetPasswordConfirmInput: ResetPasswordConfirmInput): Observable<any>;
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

  resetPassword(email: string) {
    const operation = {
      query: gql`
          mutation resetPassword($email: String!) {
              resetPassword(email: $email)
          }
      `,
      variables: {
        email,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }

  resetPasswordConfirmCode(resetPasswordCode: string) {
    const operation = {
      query: gql`
          mutation resetPasswordConfirmCode($resetPasswordCode: String!) {
              resetPasswordConfirmCode(resetPasswordCode: $resetPasswordCode)
          }
      `,
      variables: {
        resetPasswordCode,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }

  newPassword(input: ResetPasswordConfirmInput) {
    const operation = {
      query: gql`
          mutation resetPasswordConfirm($input: ResetPasswordConfirmInput!) {
              resetPasswordConfirm(input: $input) ${userWithProfile}
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