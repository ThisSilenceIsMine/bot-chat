import { Schema, Types, model } from 'mongoose';
import { getIdFromName } from './UserSchema';
import { Message as MessageType } from '@bot-chat/shared-types';

export interface Message {
  sender: Types.ObjectId;
  reciever: Types.ObjectId;
  seenAt?: string;
  content: string;
  timeStamp: string;
}

const schema = new Schema<Message>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reciever: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  seenAt: { type: String, required: false },
  content: { type: String, required: true },
  timeStamp: { type: String, required: true },
});

export const MessageModel = model<Message>('Message', schema);

export const saveMessage = async (message: MessageType) => {
  console.log(message);

  const sender = await getIdFromName(message.sender);
  const reciever = await getIdFromName(message.reciever);

  if (!sender && !reciever) {
    console.log('Sender and / or reciever not found!');
    return undefined;
  }

  return MessageModel.create({
    ...message,
    sender: sender,
    reciever: reciever,
  });
};
