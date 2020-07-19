import {gql} from 'apollo-server-express';

export const typeDefs = gql`

  input RegisterInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Status {
    success: Boolean!
  }

  type Viewer {
    email: String!
    username: String
  }


  
  type Mutation {
    register(input: RegisterInput): Status!
  }

  type Query {
    login(input: LoginInput): Viewer!
  }
`