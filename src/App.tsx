import { useState } from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Home from "./modules/Home/Home";
import UserContext from "./Context/UserContext";
import OperationContext from "./Context/OperationContext";
import GraphQlProvider from "./GraphQl";
function App() {
  return (
    <GraphQlProvider>
      <UserContext>
        <OperationContext>
        <Home />
        </OperationContext>
      </UserContext>
    </GraphQlProvider>
  );
}

export default App;
