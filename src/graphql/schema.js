import { gql } from 'apollo-server-core';
import { userTypeDefs } from './user/typedefs';
import { userResolvers } from './user/resolvers';
import { postTypeDefs } from './post/typedefs';

const rootTypeDefs = gql`
  type Query {
    _root: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _root: () => true,
  },
};

export const typeDefs = [rootTypeDefs, userTypeDefs, postTypeDefs];
export const resolvers = [rootResolvers, userResolvers];
