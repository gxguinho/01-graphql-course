import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/schema';
import { context } from './graphql/context';
import { PostsApi } from './graphql/post/datasource';
import { UsersApi } from './graphql/user/datasources';
import { LoginApi } from './graphql/login/datasources';

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(),
    };
  },
});

server
  .listen(4000)
  .then(({ url }) => console.log(`Server is running on ${url}`));
