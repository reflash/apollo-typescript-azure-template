import { ApolloServer, gql } from "apollo-server-azure-functions"

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const engine = {    
  reportSchema: true
}

const server = new ApolloServer({ typeDefs, resolvers, engine });

export default server.createHandler();