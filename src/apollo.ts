import { HttpLink, split, ApolloClient, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const getHeaders = (token?: string) => {
  const headers: any = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const makeApolloClient = (token?: string) => {
  // Create an http link:
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HASURA_SERVER_ENDPOINT,
    fetch,
    headers: getHeaders(token),
  });

  // Create a WebSocket link:
  const wsLink: any = new WebSocketLink(
    new SubscriptionClient(process.env.REACT_APP_HASURA_WS_SERVER_ENDPOINT ?? '', {
      reconnect: true,
      timeout: 30000,
      connectionParams: () => {
        return { headers: getHeaders(token) };
      },
      connectionCallback: (err) => {
        if (err) {
          wsLink.subscriptionClient.close(false, false);
        }
      },
    })
  );

  // chose the link to use based on operation
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
      addTypename: true,
    }),
  });

  return client;
};

export default makeApolloClient;
