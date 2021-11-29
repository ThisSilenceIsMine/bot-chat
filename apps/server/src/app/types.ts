import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@bot-chat/shared-types';
import { Server as IOServer, Socket as IOSocket } from 'socket.io';

export type Server = IOServer<ClientToServerEvents, ServerToClientEvents>;
export type Socket = IOSocket<ClientToServerEvents, ServerToClientEvents>;
