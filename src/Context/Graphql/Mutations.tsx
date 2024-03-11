import { gql } from "@apollo/client";

export const taskOperation = gql`
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
