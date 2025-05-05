import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Create error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Operation: ${operation.operationName}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

// Create HTTP link
const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql',
});

// Create the Apollo Client instance with error handling
export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    },
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    },
  },
});