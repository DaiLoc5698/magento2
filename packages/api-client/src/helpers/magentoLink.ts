import { createHttpLink } from 'apollo-link-http';
import { Config } from '../types/setup';
import fetch from 'isomorphic-fetch';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { Logger } from '@vue-storefront/core';
import introspectionQueryResultData from '../types/fragmentTypes';
import { ApiState } from './ApiState';

const createErrorHandler = () => {
  return onError(({
    graphQLErrors,
    networkError
  }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({
        message,
        locations,
        path
      }) => {
        if (!message.includes('Resource Owner Password Credentials Grant')) {
          if (!locations) {
            Logger.error(`[GraphQL error]: Message: ${ message }, Path: ${ path }`);
            return;
          }

          const parsedLocations = locations.map(({
            column,
            line
          }) => `[column: ${ column }, line: ${ line }]`);

          Logger.error(`[GraphQL error]: Message: ${ message }, Location: ${ parsedLocations.join(', ') }, Path: ${ path }`);
        }
      });
    }

    if (networkError) {
      Logger.error(`[Network error]: ${ networkError }`);
    }
  });
};

const createMagentoConnection = (settings: Config): ApolloClient<any> => {
  const apiState = new ApiState(settings.storage, settings.websites, settings.defaultStore);
  const storeCode = apiState.getStore().code;

  const httpLink = createHttpLink({
    uri: settings.api,
    fetch,
    headers: {
      Store: storeCode
    }
  });
  const onErrorLink = createErrorHandler();
  const authLink = setContext((_, { headers }) => {
    const token = apiState.getCustomerToken();
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${ token }`
        }
      };
    }
    return { headers };
  });
  const link: ApolloLink = ApolloLink.from([httpLink, onErrorLink, authLink]);
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });
  const cache = new InMemoryCache({ fragmentMatcher });
  return new ApolloClient({
    cache,
    link
  });
};

export default createMagentoConnection;
