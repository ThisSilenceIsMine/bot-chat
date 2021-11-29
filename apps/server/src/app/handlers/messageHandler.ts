import { Server, Socket } from 'socket.io';
import { MessageModel } from '../db/MessageSchema';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@bot-chat/shared-types';
import { connectionsMap, getUsername } from '../connectionsMap';
import { UserModel } from '../db/UserSchema';

type PopulatedUser = { _id: string; name: string };

export const messageHandler = async (
  io: Server,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
  socket.on('message', async (message) => {
    console.log(message);
    const sender = await UserModel.findOne({ name: message.sender })
      .select(['_id'])
      .exec();

    const reciever = await UserModel.findOne({ name: message.reciever })
      .select(['_id'])
      .exec();

    if (!sender || !reciever) {
      console.log('Sender and / or reciever not found!');
    }

    await MessageModel.create({
      ...message,
      sender: sender?._id,
      reciever: reciever?._id,
    });
    if (connectionsMap[message.reciever]) {
      socket.to(connectionsMap[message.reciever]).emit('message', message);
    }
  });

  socket.on('loadHistory', async (contact) => {
    const username = getUsername(socket.id);

    const userId = await UserModel.findOne({ name: username })
      .select(['_id'])
      .exec();

    const contactId = await UserModel.findOne({ name: contact })
      .select(['_id'])
      .exec();

    if (!contactId || !userId) {
      console.log(`contact ${contact} user ${username}`);
      console.log(`contactID ${contactId} userID ${userId}`);
      return;
    }

    const messageHistory = await MessageModel.find({
      $or: [
        { sender: contactId._id, reciever: userId._id },
        { sender: userId._id, reciever: contactId._id },
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
};
