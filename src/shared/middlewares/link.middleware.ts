import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { map } from 'rxjs/operators';
import authService from '../../shared/services/auth.service';

import { apiEndpoint } from '../constants/apiEndpoint';

const link = createUploadLink({uri: `${apiEndpoint}/graphql`});

const authMiddleware = setContext(() => {
  const token$ = authService.getToken().pipe(
    map(token => {
      return {
        headers: {
          authorization: `Bearer ${token}` || null,
        },
      };
    }),
  );
  return new Promise((next, error) => {
    token$.subscribe({next, error});
  });
});

const errorMiddleware = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) => {
      console.log(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }

  if (networkError) {
    console.log(`Network error: ${networkError}`);
  }
});

export default ApolloLink.from([
  authMiddleware,
  errorMiddleware,
  link,
]);
