import * as express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { connect } from './app/db/Connection';

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@bot-chat/shared-types';
import { connectionHandler } from './app/handlers/incomingConnection';

const app = express();
const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

app.get('/api', (req, res) => {
  res.sendFile(__dirname + '/assets/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  connectionHandler(io, socket);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.port || 3333;

//Connect to database
connect().then(() => server.emit('ready'));

//Once connection is established - launch server
server.once('ready', () => {
  server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
});

server.on('error', console.error.bind(console));
