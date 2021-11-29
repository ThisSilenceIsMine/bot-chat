import { useEffect, useState } from 'react';
import { UserContact } from '@bot-chat/shared-types';
import { UserData, socket } from '../socket';

export const useChat = () => {
  const [userData, setUserData] = useState<UserData>(null!);
  const [contacts, setContacts] = useState<UserContact[]>();

  useEffect(() => {
    socket.on('userData', async (name, avatar) => {
      if (!localStorage.getItem('username')) {
        localStorage.setItem('username', name);
        localStorage.setItem('avatar', avatar);
      }
      setUserData({ name, avatar });
    });

    socket.on('contacts', (contacts) => {
      setContacts(contacts);
    });
    return () => {
      socket.off('userData');
      socket.off('contacts');
    };
  }, []);

  return { userData, contacts };
};
