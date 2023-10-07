import { gql } from 'apollo-server-core';
import { userTypeDefs } from './user/typedefs';
import { userResolvers } from './user/resolvers';
import { postTypeDefs } from './post/typedefs';
import { postResolvers } from './post/resolvers';
import { apiFiltersTypeDefs } from './api-filters/typedefs';
import { apiFiltersResolvers } from './api-filters/resolvers';
import { loginTypedefs } from './login/typesdefs';
import { loginResolvers } from './login/resolvers';

const rootTypeDefs = gql`
  type Query {
    _root: Boolean
  }

  type Mutation {
    _root: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _root: () => true,
  },
  Mutation: {
    _root: () => true,
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  apiFiltersTypeDefs,
  loginTypedefs,
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  apiFiltersResolvers,
  loginResolvers,
];
