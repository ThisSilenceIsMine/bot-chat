import { Schema, Types, model } from 'mongoose';

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
