import sqlite3 from 'sqlite3';
/* eslint-disable import/no-mutable-exports */
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
// import User from '../models/user.model';
import 'dotenv/config';

const options: ConnectionOptions = {
    type: "sqlite",
    database: "like_sistemas.db",
    entities: ['./src/models/**/*{.js,.ts}'],
    logging: true,
  };
  
  export let connection : Connection | undefined;
  
  export const connect = async (): Promise<Connection | undefined> => {
    try {
      const conn = await createConnection(options);
      connection = conn;
      console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };

  export const PrepareDB = () => new sqlite3.Database(':memory:');