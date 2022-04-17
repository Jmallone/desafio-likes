import 'dotenv/config';
// import "reflect-metadata";

import http from 'http';
import server from './server';

const { PORT } = process.env;

http.createServer({}, server)
  .listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });