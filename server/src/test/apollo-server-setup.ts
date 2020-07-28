import {createTestClient, ApolloServerTestClient} from 'apollo-server-testing';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs, resolvers} from '../graphql';

declare global {
  // eslint-disable-next-line
  namespace NodeJS {
    interface Global {
      ApolloTestServer: ApolloServerTestClient;
    }
  }
}

export const requestMock = jest.fn()

export const responseMock = {
  cookie: jest.fn()
}

const GQL_OPTS = {
  typeDefs, 
  resolvers, 
  context: () => ({req: requestMock, res: responseMock})
}

// eslint-disable-next-line 
const server = (new ApolloServer(GQL_OPTS)) as any; //temp fix
global.ApolloTestServer = createTestClient(server) as ApolloServerTestClient;