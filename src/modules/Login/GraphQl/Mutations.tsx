import { gql } from "@apollo/client";

export const GetUser = gql`
mutation GetUser($email:String!) {
    getUser(email: $email) {
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
`
// export const AddUser = gql`
//   input TaskInput {
//     id: Int!
//     task: String!
//     status: Boolean!
//   }

//   input UserInput {
//     id: String!
//     name: String!
//     email: String!
//     tasks: [TaskInput!]!
//   }

//   mutation AddUser($user: UserInput!) {
//     addUser(user: $user) {
//       statusCode
//       message
//     }
//   }
// `;

export const AddUser = gql`
mutation AddUser($user: UserInput!) {
    addUser(user: $user) {
      statusCode
      message
    }
  }
`;