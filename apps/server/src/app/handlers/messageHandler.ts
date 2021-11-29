import { Server, Socket } from '../types';
import { MessageModel, saveMessage, getIdFromName } from '../db';
import { connectionsMap, getUsername } from '../connectionsMap';
import { botList } from '../bots';

type PopulatedUser = { _id: string; name: string };

export const messageHandler = async (io: Server, socket: Socket) => {
  socket.on('message', async (message) => {
    if (botList.map((x) => x.name).find((x) => x === message.reciever)) {
      return console.log('Message handled by bot!');
    }

    console.log(message);

    saveMessage(message);

    if (connectionsMap[message.reciever]) {
      socket.to(connectionsMap[message.reciever]).emit('message', message);
    }
  });

  socket.on('loadHistory', async (contact) => {
    const username = getUsername(socket.id);
    if (!username) {
      return console.error(`${username} is not online!`);
    }

    const userId: any = await getIdFromName(username);
    const contactId: any = await getIdFromName(contact);

    if (!contactId || !userId) {
      console.log(`contact ${contact} user ${username}`);
      console.log(`contactID ${contactId} userID ${userId}`);
      return socket.emit('messageHistory', []);
    }

    const messageHistory = await MessageModel.find({
      $or: [
        { sender: contactId, reciever: userId },
        { sender: userId, reciever: contactId },
      ],
    })
      .select(['sender', 'reciever', 'seenAt', 'timeStamp', 'content'])
      .populate('sender reciever', 'name')
      .lean()
      .exec();

    socket.emit(
      'messageHistory',
      messageHistory.map((message) => ({
        content: message.content,
        sender: (<PopulatedUser>(<unknown>message.sender)).name,
        reciever: (<PopulatedUser>(<unknown>message.reciever)).name,
        timeStamp: message.timeStamp,
        seenAt: message.seenAt,
      }))
    );
  });

  socket.on('messagesRead', async (from) => {
    const username = getUsername(socket.id);
    if (!username) {
      return console.error('Unable to find user!');
    }
    console.log(`${username} read all messages from ${from}!`);

    const userId: any = await getIdFromName(username);
    const fromId: any = await getIdFromName(from);

    if (!userId || !fromId) {
      return console.error('Users not found!');
    }
    const seenAt = Date.now().toString();

    await MessageModel.updateMany(
      { sender: fromId, reciever: userId, seenAt: { $exists: false } },
      { $set: { seenAt } }
    ).exec();

    if (connectionsMap[from] && username) {
      console.log('emitting messageViewed');
      socket.to(connectionsMap[from]).emit('messageViewed', username, seenAt);
    }
  });
};
