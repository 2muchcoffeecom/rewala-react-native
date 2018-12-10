import { from, Observable, ObservableInput } from 'rxjs';
import gql from 'graphql-tag';
import { execute } from 'apollo-link';

import link from '../middlewares/link.middleware';
import { user } from '../templates/user.template';

interface IUserService {
  getMe(): Observable<any>;
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
}

export default new UserService();