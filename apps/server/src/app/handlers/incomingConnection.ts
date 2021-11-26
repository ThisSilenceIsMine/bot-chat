import { Server, Socket } from 'socket.io';
import { Chance } from 'chance';

import { UserModel } from '../db/UserSchema';
import { usersMap } from '../usersMap';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@bot-chat/shared-types';

const chance = new Chance();

export const connectionHandler = (
  io: Server,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  let name: string;
  let avatar: string;

  if (typeof socket.handshake.query.name === 'string') {
    name = socket.handshake.query.name;
    avatar = '42';
    //TODO: handle loading user from DB
    UserModel.findOne({ name })
      .select('name avatar')
      .exec((err, user) => {
        if (!user?.name || !user?.avatar) {
          if (err) {
            console.error(err);
          }
          console.log(`User ${name} not Found, generating`);
          const generatedUser = generateUser();
          name = generatedUser.name;
          avatar = generatedUser.avatar;
          return;
        }
        (name = user.name), (avatar = user.avatar);
      });
  } else {
    const user = generateUser();

    avatar = user.avatar;
    name = user.name;

    UserModel.create({ name, avatar });
  }

  usersMap.set(name, socket.id);

  socket.emit('userData', name, avatar);

  const onDisconnect = () => {
    if (name) {
      usersMap.delete(name);
    }
  };

  socket.on('disconnect', onDisconnect);
};

function generateUser() {
  return {
    name: chance.name(),
    avatar: (Math.random() * 1050).toString(),
  };
}
