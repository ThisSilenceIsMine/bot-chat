import { Schema, model } from 'mongoose';

export interface User {
  name: string;
  avatar: string;
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
});

export const UserModel = model<User>('User', schema);
