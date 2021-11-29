import { Schema, model, ObjectId } from 'mongoose';

export interface User {
  name: string;
  avatar: string;
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
});

export const UserModel = model<User>('User', schema);

export const getIdFromName = async (name: string): Promise<ObjectId | null> => {
  const user = await UserModel.findOne({ name }).select(['_id']).exec();

  return user?._id;
};
