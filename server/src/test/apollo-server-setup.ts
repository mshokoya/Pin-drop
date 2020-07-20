import {createTestClient, ApolloServerTestClient} from 'apollo-server-testing';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs, resolvers} from '../graphql';
import {Request, Response} from 'express'

declare global {
  // eslint-disable-next-line
  namespace NodeJS {
    interface Global {
      ApolloTestServer: ApolloServerTestClient;
    }
  }
}

const GQL_OPTS = {
  typeDefs, 
  resolvers, 
  context: (
    {req, res}: {req: Request, res: Response}) => ({req, res}
  )
}

// eslint-disable-next-line 
const server = (new ApolloServer(GQL_OPTS)) as any; //temp fix
global.ApolloTestServer = createTestClient(server);