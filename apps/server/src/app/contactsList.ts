import { UserContact } from '@bot-chat/shared-types';

import { UserModel } from './db/UserSchema';
import { connectionsMap } from './connectionsMap';

const allUsers = async (): Promise<UserContact[]> => {
  return UserModel.find({}).select('name avatar');
};

export const contactsList = async () => {
  try {
    const users = await allUsers();

    return users.map((user) => ({
      ...user,
      status: connectionsMap.has(user.name),
    }));
  } catch (error) {
    console.error(error);

    return undefined;
  }
};
