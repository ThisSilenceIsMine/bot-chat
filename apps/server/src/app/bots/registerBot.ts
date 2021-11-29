import { Message, UserContact } from '@bot-chat/shared-types';
import { getUsername } from '../connectionsMap';
import { saveMessage } from '../db/MessageSchema';
import { UserModel } from '../db/UserSchema';
import { Server } from '../types';
import { Bot } from './BotType';

export const botList: UserContact[] = [];

export const registerBot = async (io: Server, bot: Bot) => {
  botList.push({
    name: bot.name,
    avatar: Math.floor(Math.random() * 1050).toString(),
    isOnline: true,
  });
  const doc = await UserModel.findOneAndUpdate(
    {
      name: bot.name,
    },
    {
      $setOnInsert: {
        name: bot.name,
        avatar: Math.floor(Math.random() * 1050),
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  console.log(doc);

  io.use((socket, next) => {
    if (bot.act) {
      bot.act().subscribe({
        next(message) {
          const username = getUsername(socket.id);
          if (!username) {
            console.log('No user found');
            return next();
          }

          const messageObj = {
            sender: bot.name,
            reciever: username,
            timeStamp: Date.now().toString(),
            content: message,
          };
          saveMessage(messageObj);
          socket.broadcast.emit('message', messageObj);
        },
      });
    }

    const onMessage = async (message: Message) => {
      if (!bot.respond) {
        return;
      }

      if (message.reciever !== bot.name) {
        return;
      }

      saveMessage(message);

      const username = getUsername(socket.id);
      if (!username) {
        console.log('No user found');
        return next();
      }

      const messageObj = {
        sender: bot.name,
        reciever: username,
        timeStamp: Date.now().toString(),
        content: await bot.respond(message.content),
      };

      saveMessage(messageObj);
      socket.emit('message', messageObj);
    };

    socket.on('message', onMessage);

    next();
  });
};
