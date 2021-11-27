import localforage from 'localforage';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import {
  ServerToClientEvents,
  ClientToServerEvents,
  UserContact,
} from '@bot-chat/shared-types';

type UserData = { name: string; avatar: string };

export const useChat = (uri?: string) => {
  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  const [userData, setUserData] = useState<UserData>(null!);
  const [contacts, setContacts] = useState<UserContact[]>();

  useEffect(() => {
    (async () => {
      const storedUser = await localforage.getItem<UserData>('userData');

      socketRef.current = io(uri ?? 'localhost:3333', {
        query: { name: storedUser?.name },
      });

      socketRef.current.on('userData', async (name, avatar) => {
        if (!storedUser) {
          await localforage.setItem('userData', { name, avatar });
        }
        setUserData({ name, avatar });
        console.log(`name: ${storedUser?.name} av: ${storedUser?.avatar}`);
      });

      socketRef.current.on('contacts', (contacts) => {
        setContacts(contacts);
      });
    })();
    return () => {
      socketRef.current?.disconnect();
    };
  }, [uri]);

  return { userData, contacts };
};
