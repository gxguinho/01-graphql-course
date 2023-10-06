import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/schema';
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: () => {
    return {
      fetch,
    };
  },
});

server
  .listen(4000)
  .then(({ url }) => console.log(`Server is running on ${url}`));
