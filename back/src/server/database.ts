/* eslint-disable import/no-mutable-exports */
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import 'dotenv/config';

const options: ConnectionOptions = {
  type: 'postgres',
  host: String(process.env.HOST_DB),
  port: Number(process.env.PORT_DB),
  username: String(process.env.USER_DB),
  password: String(process.env.PASSWORD_DB),
  database: String(process.env.DATABASE_DB),
  entities: ['./src/models/**/*{.js,.ts}'],
  logging: false
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

  // export const PrepareDB = () => new sqlite3.Database(':memory:');