import React from "react";
import { baseUrl,wsUrl } from "./constant";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  createHttpLink,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
function GraphQlProvider({ children }) {
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

  const httpLink = createHttpLink({
    uri: baseUrl,
  });

  const wsLink = new WebSocketLink({
    uri: wsUrl,
    options: {
      reconnect: true,
    },
  });

  // const link = from([
  //   errorLink,
  //   new HttpLink({ uri: baseUrl}),
  // ]);

  const link = split(
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
    cache: new InMemoryCache(),
    link: link,
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphQlProvider;
