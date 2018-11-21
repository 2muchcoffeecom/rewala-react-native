import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

import { apiEndpoint } from '../constants/apiEndpoint';

const link = createUploadLink({uri: `${apiEndpoint}/graphql`});

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
  errorMiddleware,
  link,
]);
