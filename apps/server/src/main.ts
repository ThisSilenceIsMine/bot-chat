import * as express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { connect } from './app/db/Connection';

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@bot-chat/shared-types';
import { connectionHandler } from './app/handlers/incomingConnection';
import { messageHandler } from './app/handlers/messageHandler';
import { EchoBot, registerBot } from './app/bots';
import { connectionMiddleware } from './app/handlers/middleware/connection';
import { ReverseBot } from './app/bots/ReverseBot';
import { SpamBot } from './app/bots/SpamBot';
import { IgnoreBot } from './app/bots/IgnoreBot';
const app = express();
const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: { origin: '*' },
});

io.use(connectionMiddleware);

registerBot(io, new EchoBot());
registerBot(io, new ReverseBot());
registerBot(io, new SpamBot());
registerBot(io, new IgnoreBot());

io.on('connection', (socket) => {
  console.log('a user connected');
  connectionHandler(io, socket);
  messageHandler(io, socket);
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
