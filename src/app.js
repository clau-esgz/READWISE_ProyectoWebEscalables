const Server = require('./config/server');
const express = require('express');
const libros = require('./routes/libro');
const app = express();

app.use(libros);

require('dotenv').config();

const server = new Server();
server.listen();
