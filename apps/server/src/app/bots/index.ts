import { Message, UserContact } from '@bot-chat/shared-types';
import { getUsername } from '../connectionsMap';
import { Server } from '../types';
import { Bot } from './BotType';

export * from './EchoBot';

export const botList: UserContact[] = [];

export const registerBot = (io: Server, bot: Bot) => {
  botList.push({
    name: bot.name,
    avatar: Math.floor(Math.random() * 1050).toString(),
    isOnline: true,
  });
  io.use((socket, next) => {
    const username = getUsername(socket.id);
    console.log(`bot found username: ${username}`);
    if (!username) {
      console.log('No user found');
      return next();
    }

    if (bot.act) {
      bot.act().subscribe({
        next(message) {
          socket.broadcast.emit('message', {
            sender: bot.name,
            reciever: username,
            timeStamp: Date.now().toString(),
            content: message,
          });
        },
      });
    }

    const onMessage = (message: Message) => {
      console.log(message);
      if (!bot.respond) {
        return;
      }

      if (message.reciever !== bot.name) {
        return;
      }

      socket.emit('message', {
        sender: bot.name,
        reciever: username,
        timeStamp: Date.now().toString(),
        content: bot.respond(message.content),
      });
    };

    // if (bot.respond) {
    console.log(`${bot.name} will handle messages`);
    socket.on('message', onMessage);
    // }
    next();
  });
};
