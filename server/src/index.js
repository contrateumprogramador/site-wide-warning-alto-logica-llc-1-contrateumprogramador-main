import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import './utils/db';
import schema from './schema';
import {serverStatusPlugin} from './utils/plugins';

dotenv.config();

const app = express();

const server = new ApolloServer({
  schema,
  cors: true,
  playground: process.env.NODE_ENV === 'development' ? true : false,
  introspection: true,
  tracing: true,
  plugins: [serverStatusPlugin],
  path: '/',
});

server.applyMiddleware({
  app,
  path: '/',
  cors: true,
  onHealthCheck: () =>
  // eslint-disable-next-line no-undef
    new Promise((resolve, reject) => {
      if (mongoose.connection.readyState > 0) {
        resolve();
      } else {
        reject(new Error('Could not connect to MongoDB server'));
      }
    }),
});

app.listen({port: process.env.PORT}, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
});
