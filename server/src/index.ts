import express, {Application} from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs, resolvers} from './graphql';

const PORT = process.env.PORT
const MONGO_URI = ` mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;

const mount = async (app: Application) => {

  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(compression());

  await mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }, () => {
    console.log('[mongo] connected to mongoDb');

    const qraphQlServer = new ApolloServer({typeDefs, resolvers, context: ({req, res}) => ({req, res})})
    qraphQlServer.applyMiddleware({app, path: '/api'});
    console.log('[apollo] apollo successfully initialized');
  
    app.listen(PORT, () => {
      console.log(`[app] http://localhost:${PORT}`);
    });

  });

}

mount(express());