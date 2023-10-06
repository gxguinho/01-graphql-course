import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type Query {
    user(id: String!): User!
    users: [User!]!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
    # posts: [Post!]!
  }
`;
