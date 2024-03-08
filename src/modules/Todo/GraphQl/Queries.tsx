import { gql } from "@apollo/client";

export const Get_users = gql`
  query Todos {
    users {
      id
      email
      name
    }
  }
`;

export const Tasks_queries = gql`
  query Todos {
    todos {
      id
      description
    }
  }
`;
