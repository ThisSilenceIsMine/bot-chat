import { UserContact } from '@bot-chat/shared-types';

import { UserModel } from './db/UserSchema';
import { connectionsMap } from './connectionsMap';

const allUsers = async (): Promise<UserContact[]> => {
  return UserModel.find({}).select(['name', 'avatar']);
};

export const contactsList = async () => {
  try {
    const users = await allUsers();

    const res = users.map((user) => {
      return {
        name: user.name,
        avatar: user.avatar,
        isOnline: connectionsMap.has(user.name),
      };
    });

    // console.log(res);

    return res;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};
