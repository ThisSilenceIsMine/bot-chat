import type { Server, Socket } from '../types';

import { connectionsMap, getUsername } from '../connectionsMap';

import { contactsList } from '../contactsList';

export const connectionHandler = async (io: Server, socket: Socket) => {
  const name = getUsername(socket.id);

  const contacts = await contactsList();

  if (contacts) {
    io.emit('contacts', contacts);
  } else {
    console.error('Failed fetching contacts!');
  }

  const onDisconnect = async () => {
    if (name) {
      delete connectionsMap[name];
      const contacts = await contactsList();
      if (contacts) {
        socket.broadcast.emit('contacts', contacts);
      } else {
        console.error('Failed fetching contacts!');
      }
    }
  };

  socket.on('disconnect', onDisconnect);
};
