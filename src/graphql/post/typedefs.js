import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  type Query {
    post: Post!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    # user: User!
    indexRef: Int!
    createdAt: String!
  }
`;
