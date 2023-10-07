import { AuthenticationError } from 'apollo-server';
import { checkIsLoggedIn } from '../login/utils/auth-functions';
// Query resolvers

const posts = async (_, { input }, { dataSources, loggedUserId }) => {
  if (!loggedUserId) {
    throw new AuthenticationError('You have to log in');
  }

  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

// Field resolver

const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadById(userId);
};

// Mutation resolvers

const createPost = async (_, { data }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);
  data.userId = loggedUserId;

  return dataSources.postApi.createPost(data);
};

const updatePost = async (
  _,
  { postId, data },
  { dataSources, loggedUserId },
) => {
  checkIsLoggedIn(loggedUserId);

  return dataSources.postApi.updatePost(postId, data);
};

const deletePost = async (_, { postId }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);
  return dataSources.postApi.deletePost(postId);
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  Post: {
    user,
  },
  Mutation: { createPost, updatePost, deletePost },
};
