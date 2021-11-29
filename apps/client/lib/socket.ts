import io, { Socket } from 'socket.io-client';

import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '@bot-chat/shared-types';

export type UserData = { name: string; avatar: string };

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

export const socket: SocketType = io(
  process.env.SOCKET_URI ?? 'localhost:3333',
  {
    query: { name: localStorage.getItem('username') },
  }
);
