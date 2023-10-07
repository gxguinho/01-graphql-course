import { AuthenticationError } from 'apollo-server';
import { checkOwner } from '../login/utils/auth-functions';

const users = async (_, { input }, { getUsers }) => {
  const apiFiltersInput = new URLSearchParams(input);

  const users = await getUsers('/?' + apiFiltersInput);
  return users.json();
};

const user = async (_, { id }, { dataSources }) => {
  const user = await dataSources.userApi.getUser(id);

  return user;
};

const posts = ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoadByUserId(id);
};

// Mutation Resolvers
const createUser = async (_, { data }, { dataSources }) => {
  return dataSources.userApi.createUser(data);
};

const updateUser = async (
  _,
  { userId, data },
  { dataSources, loggedUserId },
) => {
  if (!loggedUserId) {
    throw new AuthenticationError('You have to log in');
  }

  if (loggedUserId !== userId) {
    throw new AuthenticationError('You cannot updade this user.');
  }

  return dataSources.userApi.updateUser(userId, data);
};

const deleteUser = async (_, { userId }, { dataSources, loggedUserId }) => {
  checkOwner(userId, loggedUserId);
  return dataSources.userApi.deleteUser(userId);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
  Mutation: { createUser, updateUser, deleteUser },
  User: { posts },
};
