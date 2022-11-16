import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
import passportJwt from '../config/passport';

import express from 'express';

import userRoutes from '../routes/user.routes';
import bookRoutes from '../routes/book.routes';
import { connect } from './database';

// Instantiate express
const server = express();
server.use(compression());

// Passport Config
server.use(passportJwt().initialize());

// Connect to sqlite
if (process.env.NODE_ENV !== 'test') {
  connect();
}

server.use(cors());
server.use(express.json());

// // Initialize routes middleware
server.use('/api/users', userRoutes);
server.use('/api/books', bookRoutes);

export default server;
