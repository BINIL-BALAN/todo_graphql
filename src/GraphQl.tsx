import React from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";
function GraphQlProvider({children}) {
    const errorLink = onError(({ graphqlErrors, networkError }) => {
        if (graphqlErrors) {
          graphqlErrors.map(({ message, location, path }) => {
            alert(`Graphql error ${message}`);
          });
        }
      });
      const link = from([
        errorLink,
        new HttpLink({ uri: "http://localhost:8000/graphql" }),
      ]);
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link,
      });
  return (
   <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default GraphQlProvider
