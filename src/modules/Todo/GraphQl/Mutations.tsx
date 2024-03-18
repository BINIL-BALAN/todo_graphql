import { gql } from "@apollo/client";

export const addTask = gql`
  mutation Operations($params:TaskParams){
      operations(params:$params){
         result{
            statusCode
            message
         }
         details{
            id
            name
            email
            task{
                id
                task
                status
            }
         }
      }
  }
`
export const subscription_task = gql`
subscription {
   updations {
      result {
          statusCode
          message
      }
      details {
          id
          name
          email
          image
          task {
              id
              task
              status
          }
      }
  }
}
`;