import { from, Observable, ObservableInput } from 'rxjs';
import gql from 'graphql-tag';
import { user } from '../templates/user.template';
import { execute } from 'apollo-link';
import link from '../middlewares/link.middleware';

export interface ContactInput {
  emails: string[];
  phones: string[];
}

interface IContactsService {
  sendContactsToServer(input: ContactInput[]): Observable<any>;
}

class ContactsService implements IContactsService {

  sendContactsToServer(input: ContactInput[]) {
    const operation = {
      query: gql`
        mutation importContacts($input: [ContactInput]) {
          importContacts(input: $input) ${user}
        }
      `,
      variables: {
        input,
      },
    };
    return from(execute(link, operation) as ObservableInput<any>);
  }
}

export default new ContactsService();
