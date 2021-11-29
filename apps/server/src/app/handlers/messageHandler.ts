import { Server, Socket } from 'socket.io';
import { MessageModel } from '../db/MessageSchema';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@bot-chat/shared-types';
import { connectionsMap, getUsername } from '../connectionsMap';
import { getIdFromName, UserModel } from '../db/UserSchema';
import { format } from 'util';
import { Condition, ObjectId } from 'mongoose';

type PopulatedUser = { _id: string; name: string };

export const messageHandler = async (
  io: Server,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on('message', async (message) => {
    console.log(message);

    const sender = await getIdFromName(message.sender);
    const reciever = await getIdFromName(message.reciever);

    if (!sender || !reciever) {
      console.log('Sender and / or reciever not found!');
    }

    await MessageModel.create({
      ...message,
      sender: sender,
      reciever: reciever,
    });
    if (connectionsMap[message.reciever]) {
      socket.to(connectionsMap[message.reciever]).emit('message', message);
    }
  });

  socket.on('loadHistory', async (contact) => {
    const username = getUsername(socket.id);
    if (!username) {
      return console.error(`${username} is not online!`);
    }
    // const userId = await UserModel.findOne({ name: username })
    //   .select(['_id'])
    //   .exec();

    // const contactId = await UserModel.findOne({ name: contact })
    //   .select(['_id'])
    //   .exec();

    const userId: any = await getIdFromName(username);
    const contactId: any = await getIdFromName(contact);

    if (!contactId || !userId) {
      console.log(`contact ${contact} user ${username}`);
      console.log(`contactID ${contactId} userID ${userId}`);
      return;
    }

    const messageHistory = await MessageModel.find({
      $or: [
        { sender: contactId, reciever: userId._id },
        { sender: userId, reciever: contactId._id },
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
