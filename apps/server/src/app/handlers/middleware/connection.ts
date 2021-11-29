import { Chance } from 'chance';
import { Server, Socket } from '../../types';

import { UserModel } from '../../db/UserSchema';
import { connectionsMap } from '../../connectionsMap';

const chance = new Chance();
export const connectionMiddleware = async (socket: Socket, next: any) => {
  let name;
  let avatar;
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

  connectionsMap[name] = socket.id;

  socket.emit('userData', name, avatar);
  next();
};

function generateUser() {
  return {
    name: chance.name(),
    avatar: Math.floor(Math.random() * 1050).toString(),
  };
}
