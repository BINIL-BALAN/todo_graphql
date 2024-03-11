import { gql } from "@apollo/client";

export const get_tasks = gql`
query GetTask ($email:String!){
  getTask(email: $email)
}
`;