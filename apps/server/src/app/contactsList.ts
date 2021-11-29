import { UserContact } from '@bot-chat/shared-types';

import { UserModel } from './db/UserSchema';
import { connectionsMap } from './connectionsMap';
import { botList } from './bots';

const allUsers = async (): Promise<UserContact[]> => {
  return UserModel.find({}).select(['name', 'avatar']);
};

export const contactsList = async () => {
  try {
    const users = await allUsers();

    const res: UserContact[] = users.map((user) => {
      return {
        name: user.name,
        avatar: user.avatar,
        isOnline: connectionsMap[user.name] !== undefined,
      };
    });
    console.log(botList);

    return res.concat(botList);
  } catch (error) {
    console.error(error);

    return undefined;
  }
};
