import { Server, Socket } from 'socket.io';
import { Chance } from 'chance';

import { UserModel } from '../db/UserSchema';
import { connectionsMap } from '../connectionsMap';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@bot-chat/shared-types';
import { contactsList } from '../contactsList';

const chance = new Chance();

export const connectionHandler = async (
  io: Server,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  let name: string;
  let avatar: string;

  if (typeof socket.handshake.query.name === 'string') {
    name = socket.handshake.query.name;

    const user = await UserModel.findOne({ name }).select('name avatar').exec();

    if (user) {
      name = user.name;
      avatar = user.avatar;
    } else {
      console.warn(`User ${name} not Found, generating`);

      const generatedUser = generateUser();

      name = generatedUser.name;
      avatar = generatedUser.avatar;

      UserModel.create({ name, avatar });
    }
  } else {
    const user = generateUser();

    avatar = user.avatar;
    name = user.name;

    UserModel.create({ name, avatar });
  }

  connectionsMap.set(name, socket.id);

  socket.emit('userData', name, avatar);

  const contacts = await contactsList();
  console.log(contacts);
  if (contacts) {
    socket.emit('contacts', contacts);
  } else {
    console.error('Error fetching contacts!');
  }

  const onDisconnect = () => {
    if (name) {
      connectionsMap.delete(name);
    }
  };

  socket.on('disconnect', onDisconnect);
};

function generateUser() {
  return {
    name: chance.name(),
    avatar: Math.floor(Math.random() * 1050).toString(),
  };
}
